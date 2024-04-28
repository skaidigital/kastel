import { apiVersion, projectId } from '@/lib/sanity/api';
import { defaultDocumentNodeResolver } from '@/schema/defaultDocumentNodeResolver';
import { structure } from '@/schema/structure';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig, definePlugin } from 'sanity';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';
import { media, mediaAssetSource } from 'sanity-plugin-media';
import { muxInput } from 'sanity-plugin-mux-input';
import { noteField } from 'sanity-plugin-note-field';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { webhooks } from 'sanity-plugin-webhooks';
import { presentationTool } from 'sanity/presentation';

import { env } from '@/env';
import { locate } from '@/lib/sanity/plugins/locate';
import { productVariantBasedOnProduct } from '@/lib/sanity/templates';
import { I18nFields } from 'sanity-plugin-i18n-fields';
import { structureTool } from 'sanity/structure';
import schema from './schema';
import './styles/sanity.css';

const config = definePlugin({
  name: 'sharedConfig',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: defaultDocumentNodeResolver()
    }),
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft'
        }
      }
    }),
    media(),
    muxInput({
      mp4_support: 'standard'
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    simplerColorInput({
      defaultColorFormat: 'hex',
      enableSearch: true
    }),
    webhooks(),
    noteField(),
    vercelDeployTool(),
    I18nFields({
      locales: [
        { code: 'no', title: 'Norway', label: '🇧🇻', default: true },
        { code: 'en', title: 'English', label: '🇬🇧' }
      ]
    }),
    imageHotspotArrayPlugin(),
    table()
  ],
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles?.some((role) => role.name === 'developer');

    if (isAdmin) {
      return prev;
    }

    const filteredTools = ['vision', 'webhooks'];

    return prev.filter((tool) => !filteredTools.includes(tool.name));
  },
  form: {
    file: {
      assetSources: () => [mediaAssetSource]
    },
    image: {
      assetSources: () => [mediaAssetSource]
    }
  },
  schema: {
    types: schema,
    templates: [productVariantBasedOnProduct]
  },
  document: {
    actions: (prev, context) => {
      // if (context.schemaType === 'product') {
      //   const productSyncActions = SyncProductToShopify(context);
      //   const productSyncActionsFunctions = productSyncActions.map((action) => {
      //     return () => action;
      //   });

      //   const documentActions = [...prev, ...productSyncActionsFunctions];

      //   return documentActions;
      // }
      if (context.schemaType === 'productVariant') {
        const everythingExceptDuplicateAction = prev.filter(
          (action) => action.action !== 'duplicate'
        );

        return everythingExceptDuplicateAction;
      }

      return prev;
    }
  }
});

export default defineConfig({
  basePath: '/studio',
  title: 'Kastel',
  name: 'studio',
  projectId,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [config()],
  scheduledPublishing: {
    enabled: true,
    inputDateTimeFormat: 'dd.MM.yyyy HH:mm'
  }
});
