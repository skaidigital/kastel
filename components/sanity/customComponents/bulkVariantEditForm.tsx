import { bulkUpdateVariants } from '@/lib/sanity/actions';
import { ToastParams, useToast } from '@sanity/ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemoObservable } from 'react-rx';
import { useDocumentStore, useFormValue } from 'sanity';

interface ProductVariant {
  _id: string;
  name: string;
  price_no: number; // Price in 'No'
  price_sv: number; // Price in 'Sv'
  stock: number;
  sku: string;
  // Add other fields as needed
}

export interface VariantChanges {
  [key: string]: {
    price_no?: number;
    price_sv?: number;
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

  console.log(variantChanges);

  useEffect(() => {
    if (results) {
      setVariants(results);
    }
  }, [results]);

  const handleInputChange = (id: string, field: keyof ProductVariant, value: any) => {
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

      console.log('Transaction committed successfully');
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
      <table className="w-full table-auto border-collapse border border-gray-300 text-[14px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">SKU</th>
            <th className="border border-gray-300 p-2">Price (No)</th>
            <th className="border border-gray-300 p-2">Price (Sv)</th>
            <th className="border border-gray-300 p-2">Stock</th>
            {/* <th className="border border-gray-300 p-2">Variant</th> */}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id} className="hover:bg-gray-50">
              <td className="w-1/3 border border-gray-300 p-2">
                <input
                  type="string"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.sku ?? variant.sku}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'sku', String(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.price_no ?? variant.price_no}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'price_no', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  className="form-input w-full rounded-md border-gray-300"
                  value={variantChanges[variant._id]?.price_sv ?? variant.price_sv}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(variant._id, 'price_sv', Number(e.target.value))
                  }
                />
              </td>
              <td className="border border-gray-300 p-2">
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
          //   type="submit"
          onClick={handleSubmit}
          disabled={Object.keys(variantChanges).length === 0} // Re-enable conditional disabling
          className="rounded-sm bg-black px-4 py-2 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
