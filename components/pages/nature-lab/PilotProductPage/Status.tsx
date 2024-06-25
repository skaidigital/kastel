import { StatusItem } from '@/components/pages/nature-lab/PilotProductPage/StatusItem'

export function Status() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h2 className="font-nature-lab-heading text-nature-lab-dark-grey uppercase text-nature-lab-heading-md lg:text-nature-lab-heading-lg mb-6">
          How Pre-orders Work
        </h2>
        <p className="font-nature-lab-body text-brand-mid-grey mb-10 text-nature-lab-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor placerat nisi.
          Curabitur eleifend. Proin sem urna, laoreet ut diam. Sed fringilla egestas vehicula
        </p>
      </div>
      <div className="flex flex-col gap-y-4 lg:gap-y-6">
        <StatusItem status="pre-order" price="150" />
        <StatusItem status="production" isCurrent price="150" />
        <StatusItem status="shipping" price="150" />
      </div>
    </div>
  )
}
