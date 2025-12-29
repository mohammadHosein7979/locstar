import { amountNumbers } from "@/app/helpers/amountNumbers"
import { Discount } from "@/app/types/model"
import { FC } from "react"
import { LazyBlurImage } from "../../ui"
import Link from "next/link"

interface DiscountCardProps {
  discount: Discount
}

const DiscountCard: FC<DiscountCardProps> = ({ discount }) => {
  return (
    <Link href={`/locations/${discount.location.slug}`} className="flex items-center mb-4">
      <div className="w-1/4">
      <LazyBlurImage src={discount.location.primary_image} className="rounded-xl" />
      </div>
      <div className="w-3/4 mr-2">
        <div className="font-bold">{amountNumbers(discount.amount)}</div>
        <div>{discount.location.name}</div>
      </div>
    </Link>
  )
}

export default DiscountCard