'use client';

import { useProductInventory } from '@/app/api/shopify/useProductInventory';
import { goToVippsHurtigkasse } from '@/components/ProductForm/VippsHurtigkasseButton/actions';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface Props {
  variants: ProductVariant[];
  productType: Product['type'];
  productId: string;
  classname?: string;
}

export function VippsHurtigkasseButton({ variants, productType, productId, classname }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const activeVariant = useActiveVariant({
    variants,
    productType
  });

  const { data: inventory, isLoading: inventoryLoading } = useProductInventory(productId);

  const id = activeVariant?.id;
  const availableForSale = inventory?.variants.edges.find((variant) => variant.node.id === id)?.node
    .availableForSale;

  return (
    <button
      className={cn('disabled:cursor-not-allowed disabled:opacity-50', classname)}
      onClick={() => {
        if (!availableForSale || !id) return;
        startTransition(async () => {
          const response = await goToVippsHurtigkasse(id);

          if (response) {
            router.push(response);
          }
        });
      }}
      disabled={!availableForSale || !id || isPending || inventoryLoading}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 399 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.66687" width="399" height="44" rx="5" fill="#FF5B24" />
        <path
          d="M122.349 17.0309H126.419C128.898 17.0309 130.285 18.3074 130.285 20.2869C130.285 21.1934 129.73 22.3034 128.583 22.9324C130.174 23.4504 130.803 24.5419 130.803 25.5964C130.803 27.5944 129.194 29.1669 126.641 29.1669H122.349V17.0309ZM124.476 23.9314V27.2614H126.437C127.695 27.2614 128.62 26.7619 128.62 25.5964C128.62 24.6529 127.732 23.9314 126.437 23.9314H124.476ZM124.476 18.9364V22.1184H126.252C127.362 22.1184 128.158 21.5264 128.158 20.5644C128.158 19.5284 127.473 18.9364 126.252 18.9364H124.476ZM137.003 21.3229C135.671 21.3229 134.746 22.0259 134.45 23.4319H139.5C139.315 21.9334 138.298 21.3229 137.003 21.3229ZM141.424 24.9489H134.376C134.524 26.5954 135.449 27.6684 137.132 27.6684C138.649 27.6684 139.26 27.0209 139.482 25.9479L141.35 26.2624C140.999 28.4269 138.927 29.4074 137.206 29.4074C134.468 29.4074 132.322 27.5389 132.322 24.4679C132.322 21.4709 134.376 19.5839 137.077 19.5839C139.611 19.5839 141.424 21.5264 141.424 24.2829V24.9489ZM143.948 17.5859L145.965 17.2714V19.8429H148.296V21.4709H145.965V26.5214C145.965 27.2429 146.261 27.6129 147.075 27.6129C147.463 27.6129 147.685 27.5759 148.055 27.4834L148.37 29.1114C147.889 29.2594 147.223 29.4074 146.668 29.4074C144.799 29.4074 143.948 28.3344 143.948 26.6139V21.4709H142.209V19.8429H143.948V17.5859ZM153.682 29.4074C151.758 29.4074 149.594 27.8164 149.594 24.4124C149.594 21.1564 151.74 19.5839 153.701 19.5839C155.162 19.5839 156.18 20.1944 156.846 21.6559V19.8429H158.862V29.1669H156.846V27.2614C156.383 28.3899 155.347 29.4074 153.682 29.4074ZM154.256 21.3229C152.979 21.3229 151.629 22.3219 151.629 24.5234C151.629 26.6879 152.961 27.6499 154.237 27.6499C155.625 27.6499 156.846 26.7434 156.846 24.5234C156.846 22.3589 155.625 21.3229 154.256 21.3229ZM161.459 16.6239H163.476V29.1669H161.459V16.6239ZM181.098 21.4154C179.951 21.4154 179.118 22.1739 179.118 23.8389V29.1669H177.083V23.7834C177.083 22.0629 176.269 21.4154 175.196 21.4154C173.975 21.4154 173.069 22.1739 173.069 23.8389V29.1669H171.052V19.8429H173.069V21.2489C173.716 20.0279 174.993 19.5839 176.066 19.5839C177.268 19.5839 178.397 20.0649 178.878 21.3784C179.581 19.9909 180.876 19.5839 181.912 19.5839C183.614 19.5839 185.149 20.4164 185.149 22.9139V29.1669H183.133V23.7834C183.133 22.0629 182.263 21.4154 181.098 21.4154ZM191.744 21.3229C190.412 21.3229 189.487 22.0259 189.191 23.4319H194.241C194.056 21.9334 193.039 21.3229 191.744 21.3229ZM196.165 24.9489H189.117C189.265 26.5954 190.19 27.6684 191.873 27.6684C193.39 27.6684 194.001 27.0209 194.223 25.9479L196.091 26.2624C195.74 28.4269 193.668 29.4074 191.947 29.4074C189.209 29.4074 187.063 27.5389 187.063 24.4679C187.063 21.4709 189.117 19.5839 191.818 19.5839C194.352 19.5839 196.165 21.5264 196.165 24.2829V24.9489ZM206.792 16.6239V29.1669H204.776V27.3909C204.313 28.5194 203.277 29.4074 201.594 29.4074C199.688 29.4074 197.524 27.8164 197.524 24.4124C197.524 21.1564 199.67 19.5839 201.853 19.5839C203.092 19.5839 204.128 20.1944 204.776 21.6559V16.6239H206.792ZM202.186 21.3229C200.909 21.3229 199.559 22.3589 199.559 24.5234C199.559 26.6324 200.891 27.6499 202.167 27.6499C203.555 27.6499 204.776 26.6879 204.776 24.5234C204.776 22.4144 203.555 21.3229 202.186 21.3229Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M278.5 21.0453C277.78 18.2976 276.031 17.2069 273.645 17.2069C271.711 17.2069 269.284 18.2976 269.284 20.924C269.284 22.6209 270.457 23.9545 272.369 24.2981L274.18 24.6211C275.414 24.8432 275.764 25.308 275.764 25.9343C275.764 26.6414 275.003 27.0453 273.871 27.0453C272.39 27.0453 271.465 26.5201 271.32 25.0452L268.708 25.4493C269.119 28.2977 271.67 29.4698 273.974 29.4698C276.155 29.4698 278.479 28.217 278.479 25.6918C278.479 23.9744 277.43 22.7222 275.476 22.3581L273.48 21.9948C272.369 21.7928 271.999 21.2473 271.999 20.722C271.999 20.0553 272.719 19.6314 273.707 19.6314C274.962 19.6314 275.846 20.0553 275.887 21.4492L278.5 21.0453ZM220.425 25.3682L223.14 17.5097H226.328L221.597 29.1663H219.231L214.5 17.51H217.688L220.425 25.3682ZM237.108 20.8433C237.108 21.7725 236.368 22.4189 235.504 22.4189C234.64 22.4189 233.899 21.7725 233.899 20.8433C233.899 19.9139 234.64 19.2677 235.504 19.2677C236.368 19.2677 237.109 19.9139 237.109 20.8433H237.108ZM237.602 24.9646C236.532 26.338 235.401 27.2875 233.405 27.2876C231.369 27.2876 229.785 26.0754 228.551 24.2978C228.057 23.5704 227.296 23.4089 226.74 23.7928C226.226 24.1565 226.103 24.9241 226.576 25.5909C228.283 28.1566 230.649 29.6512 233.405 29.6512C235.936 29.6512 237.911 28.4393 239.453 26.419C240.029 25.6717 240.009 24.904 239.453 24.4797C238.939 24.0753 238.178 24.2173 237.602 24.9646ZM244.7 23.3078C244.7 25.6918 246.099 26.9444 247.662 26.9444C249.143 26.9444 250.666 25.7726 250.666 23.3078C250.666 20.8833 249.143 19.7119 247.683 19.7119C246.099 19.7119 244.7 20.8229 244.7 23.3078ZM244.7 19.1263V17.5299H241.8V33.2069H244.7V27.6309C245.667 28.924 246.922 29.4698 248.341 29.4698C250.995 29.4698 253.587 27.409 253.587 23.1667C253.587 19.1057 250.892 17.2071 248.588 17.2071C246.757 17.2071 245.502 18.0352 244.7 19.1263ZM258.628 23.3078C258.628 25.6918 260.026 26.9444 261.59 26.9444C263.071 26.9444 264.593 25.7726 264.593 23.3078C264.593 20.8833 263.071 19.7119 261.61 19.7119C260.026 19.7119 258.627 20.8229 258.627 23.3078H258.628ZM258.628 19.1263V17.5299H258.627H255.727V33.2069H258.627V27.6309C259.594 28.924 260.849 29.4698 262.268 29.4698C264.922 29.4698 267.514 27.409 267.514 23.1667C267.514 19.1057 264.819 17.2071 262.515 17.2071C260.684 17.2071 259.43 18.0352 258.628 19.1263Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
