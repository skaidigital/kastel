import { randomKey } from '@/lib/sanity/studioUtils';
import { AddIcon, SearchIcon } from '@sanity/icons';
import { Box, Button, Card, Dialog, Flex, Grid, Text, TextInput } from '@sanity/ui';
import { useCallback, useState } from 'react';

/*----MODULE CARD-------*/
const ModuleCard = ({ module, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={isHovered ? 2 : 1}
      key={module.name}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      tone="default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex gap={4} direction="column">
        <Card
          radius={2}
          shadow={1}
          style={{
            position: 'relative',
            aspectRatio: 16 / 9,
            backgroundColor: 'white',
            backgroundImage: `url(/images/page-builder/${module.name}.png)`,
            backgroundSize: '100% auto',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <Flex gap={3} direction="column">
          <Text size={[2]} weight="medium">
            {module.title}
          </Text>
          <Text size={1} muted>
            {module.description ? module.description : ''}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

/*----MODULE MODAL-------*/
const SelectModuleModal = ({ modules, onClose, onItemAppend }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleModuleClick = useCallback(
    (module) => {
      onItemAppend({
        _type: module.name,
        _key: randomKey(12)
      });

      onClose();
    },
    [onItemAppend, onClose]
  );

  const filteredModules = modules.filter((module) => {
    return (
      module.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <Dialog header="Select Module" id="dialog-example" onClose={onClose} zOffset={1000} width={800}>
      <Box padding={4} style={{ borderBottom: '1px solid var(--card-border-color)' }}>
        <TextInput
          fontSize={[2]}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          padding={[3, 3, 4]}
          radius={2}
          placeholder="Search"
          value={searchValue}
          autoFocus={true}
          icon={SearchIcon}
        />
      </Box>
      <Grid columns={[1, 1, 2, 3]} padding={4} gap={4}>
        {filteredModules.map((module) => (
          <ModuleCard key={module.name} module={module} onClick={() => handleModuleClick(module)} />
        ))}
      </Grid>
    </Dialog>
  );
};

const AddModuleButton = (props) => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const modules = props.schemaType.of; // get all the schema types from the attached array

  return (
    <Grid columns={1} gap={2}>
      <Button style={{ cursor: 'pointer' }} text="Add Module" icon={AddIcon} onClick={onOpen} />

      {open && (
        <SelectModuleModal modules={modules} onClose={onClose} onItemAppend={props.onItemAppend} />
      )}
    </Grid>
  );
};

function PageBuilderModal(props) {
  return props.renderDefault({ ...props, arrayFunctions: AddModuleButton });
}

export default PageBuilderModal;
