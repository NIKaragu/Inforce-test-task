import { Product } from "../../utils/types/product"

type Props = {
  product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col pt-2 pb-2 pr-3 pl-3 w-fit min-w-56 border-2 border-slate-800 rounded-md bg-slate-100">
        <img className="max-h-48 max-w-48 rounded mb-2" src={`${product.imageUrl}`} alt="product photo" />
        <h3 className="font-semibold text-2xl mb-2">{product.name}</h3>
        <hr className="border-2 border-black mb-4"/>
        <div className="flex flex-col">
          <p className=""><b>Count</b>: {product.count}</p>
          <p className=""><b>Size</b>: {product.size.width}x{product.size.height}</p>
          <p className=""><b>Weight</b>: {product.weight}</p>
        </div>
    </div>
  )
}