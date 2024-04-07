'use client';

import { Heading } from '@/components/base/Heading';
import { getProductReviewsTESTJunip } from '@/components/pages/ProductPage/ProductReviews/ProductReviews.hooks';
import { accordionItemAnimation } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';

const getJunipQueryParams = (sort: string, stars: string) => {
  let sortParam = '';
  let starsParam = '';

  if (sort === 'Fremhevet') {
    sortParam = '&sort[field]=featured&sort[order]=desc';
  }
  if (sort === 'Nyeste') {
    sortParam = '&sort[field]=created_at&sort[order]=desc';
  }
  if (sort === 'Eldste') {
    sortParam = '&sort[field]=created_at&sort[order]=asc';
  }
  if (sort === 'Høyest rangert') {
    sortParam = '&sort[field]=rating&sort[order]=desc';
  }
  if (sort === 'Lavest rangert') {
    sortParam = '&sort[field]=rating&sort[order]=asc';
  }

  if (stars === 'All') {
    starsParam = '';
  }
  if (stars === '1 stjerne') {
    starsParam = '&filter[rating]=1';
  }
  if (stars === '2 stjerner') {
    starsParam = '&filter[rating]=2';
  }
  if (stars === '3 stjerner') {
    starsParam = '&filter[rating]=3';
  }
  if (stars === '4 stjerner') {
    starsParam = '&filter[rating]=4';
  }
  if (stars === '5 stjerner') {
    starsParam = '&filter[rating]=5';
  }

  const result = sortParam + starsParam + '&page[size]=5';

  return result;
};

interface SubHeaderProps {
  setReviews: any;
  setSearchParams: any;
  setReviewPage: any;
  productId: string;
}

const starOptions = ['All', '1 stjerne', '2 stjerner', '3 stjerner', '4 stjerner', '5 stjerner'];

const sortOptions = ['Fremhevet', 'Nyeste', 'Eldste', 'Høyest rangert', 'Lavest rangert'];

export const SubHeader = ({
  setReviews,
  setSearchParams,
  setReviewPage,
  productId
}: SubHeaderProps) => {
  const [showOptions, setShowOptions] = useState(true);

  const { register, watch } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      settingStars: 'All',
      settingSort: 'Fremhevet',
      withMedia: true
    }
  });

  const watchSettingStars = watch('settingStars');
  const watchSettingSort = watch('settingSort');

  const handleNewSearchParams = async () => {
    try {
      const params = getJunipQueryParams(watchSettingSort, watchSettingStars);

      await setSearchParams(params);

      await getProductReviewsTESTJunip(productId, params).then((response) => {
        setReviewPage(response.meta.page.after);
        setReviews(response.product_reviews);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    handleNewSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSettingStars, watchSettingSort]);

  return (
    <>
      <div className="my-56 flex flex-col gap-x-32 border-b border-brand-border pb-24 ">
        <span
          className={`text-paragraph-regular flex items-center text-brand-mid-grey ${
            showOptions && 'mb-16'
          }`}
        >
          {showOptions ? (
            <button className="flex justify-start" onClick={toggleShowOptions}>
              Skjul alternativer
            </button>
          ) : (
            <button className="flex justify-start" onClick={toggleShowOptions}>
              Vis alternativer
            </button>
          )}
          {/* <AnimatedChevron isOpen={showOptions} /> */}
        </span>
        <AnimatePresence initial={false}>
          {showOptions ? (
            <motion.div
              variants={accordionItemAnimation}
              initial="hide"
              animate="show"
              exit="hide"
              className="md:flex"
            >
              <div className="flex-1">
                <SettingStars values={starOptions} registerFunction={register} />
              </div>
              <div className="flex flex-1 justify-end">
                <SettingSort values={sortOptions} registerFunction={register} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

interface SettingStarsProps {
  values: string[];
  registerFunction: UseFormRegister<any>;
}

const SettingStars = ({ values, registerFunction }: SettingStarsProps) => {
  return (
    <>
      <div className="mb-8">
        <Heading as="h3" size="sm">
          Rangering
        </Heading>
      </div>
      <div className="flex flex-wrap gap-x-8 md:gap-y-8">
        {values?.map((value, index) => {
          return (
            <label htmlFor={value} className="text-[0px]" key={index}>
              <input
                type="radio"
                id={value}
                value={value}
                {...registerFunction('settingStars')}
                className="peer appearance-none "
              />
              <div
                className={`text-paragraph-small flex cursor-pointer justify-center border border-brand-border px-24 py-12  peer-checked:bg-brand-dark-grey peer-checked:text-white`}
              >
                {value}
              </div>
            </label>
          );
        })}
      </div>
    </>
  );
};

interface SettingSortProps {
  values: string[];
  registerFunction: UseFormRegister<any>;
}

const SettingSort = ({ values, registerFunction }: SettingSortProps) => {
  return (
    <div className="mb-16 mt-32 flex flex-col md:mb-0 md:mt-0">
      <div className="mb-8 flex md:justify-end">
        <Heading as="h3" size="sm">
          Sortering
        </Heading>
      </div>
      <div className="flex flex-wrap gap-x-8 md:justify-end md:gap-y-8">
        {values?.map((value, index) => {
          return (
            <label key={index} htmlFor={value} className="text-[0px]">
              <input
                type="radio"
                id={value}
                value={value}
                {...registerFunction('settingSort')}
                className="peer appearance-none "
              />
              <div
                className={`text-paragraph-small flex cursor-pointer justify-center  border border-brand-border px-24 py-12 peer-checked:bg-brand-dark-grey peer-checked:text-white `}
              >
                {value}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
