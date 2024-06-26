import { bulkUpdateVariants } from '@/lib/sanity/actions';
import { useToast, type ToastParams } from '@sanity/ui';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemoObservable } from 'react-rx';
import { useDocumentStore, useFormValue } from 'sanity';

interface ProductVariant {
  _id: string;
  name: string;
  price_no: number; // Price in 'No'
  price_sv: number; // Price in 'Sv'
  discountedPrice_no?: number; // Price in 'No' with discount
  discountedPrice_sv?: number; // Price in 'Sv' with discount
  stock: number;
  sku: string;
  // Add other fields as needed
}

export interface VariantChanges {
  [key: string]: {
    price_no?: number;
    price_sv?: number;
    discountedPrice_no?: number;
    discountedPrice_sv?: number;
    stock?: number;
    sku?: string;
    // Add other fields as needed
  };
}

export const BulkVariantEditForm = () => {
  const toast = useToast();
  const docId = useFormValue(['_id']) as string;
  const documentStore = useDocumentStore();

  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantChanges, setVariantChanges] = useState<VariantChanges>({}); // Track changes for each variant

  const results = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[_type == 'productVariant' && references($currentDoc, "drafts." + $currentDoc)]`,
      { currentDoc: docId },
      {}
    );
  }, [documentStore, docId]);

  useEffect(() => {
    if (results) {
      setVariants(results);
    }
  }, [results]);

  const handleInputChange = (
    id: string,
    field: keyof ProductVariant,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    value: any
  ) => {
    setVariantChanges((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const success = await bulkUpdateVariants(variantChanges);
      if (!success) {
        console.error('Transaction failed: ');
        toast.push(errorToast);
        return;
      }

      toast.push(successToast);
      setVariantChanges({});
      // Optionally, you can refresh the data or give feedback to the user
    } catch (error) {
      console.error('Transaction failed: ', error);
      toast.push(errorToast);
      // Optionally, handle the error, e.g., show a notification
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <table className="w-full table-auto border-collapse border border-gray-300 text-[13px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1">SKU</th>
            <th className="border border-gray-300 px-2 py-1">Price (No)</th>
            <th className="border border-gray-300 px-2 py-1">Discounted (No)</th>

            <th className="border border-gray-300 px-2 py-1">Price (Sv)</th>
            <th className="border border-gray-300 px-2 py-1">Discounted (Sv)</th>

            <th className="border border-gray-300 px-2 py-1">Stock</th>
            {/* <th className="border border-gray-300 p-2">Variant</th> */}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id} className="hover:bg-gray-100">
              <td className="w-1/3 border border-gray-300 px-2 py-1">
                <input
                  type="string"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.sku ?? variant.sku}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'sku', String(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.price_no ?? variant.price_no}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'price_no', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={
                    variantChanges[variant._id]?.discountedPrice_no ?? variant.discountedPrice_no
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'discountedPrice_no', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.price_sv ?? variant.price_sv}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'price_sv', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={
                    variantChanges[variant._id]?.discountedPrice_sv ?? variant.discountedPrice_sv
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'discountedPrice_sv', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={0}
                  readOnly={true}
                />
              </td>
              {/* <td className="border border-gray-300 p-2">
                <Link className="px-4 py-2 bg-black rounded-sm text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500" href={`/studio/structure/products;${docId};variants;${variant._id}`}>
                    Edit
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={Object.keys(variantChanges).length === 0} // Re-enable conditional disabling
          className="rounded-sm bg-black px-2 py-1 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

const errorToast: ToastParams = {
  status: 'error',
  title: 'Updating failed',
  description: 'There was an issue updating the variants. Please try again later.',
  duration: 9999,
  closable: true
};

const successToast: ToastParams = {
  status: 'success',
  title: 'Variants updated',
  description: 'The variants have been successfully updated.',
  duration: 9999,
  closable: true
};
