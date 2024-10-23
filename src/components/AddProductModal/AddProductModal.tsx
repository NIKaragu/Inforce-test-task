import { useMemo, useState } from "react"
import { Product } from "../../utils/types/product"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import classNames from "classnames"
import { createProduct } from "../../redux/slices/products"

type Props = {
  handleClickForm: () => void
}

const defaultProduct: Product = {
  id: 0,
  imageUrl: '',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '',
  comments: [],
}

function findBiggestId(products: Product[]) {
  const productIds = products.map((product) => product.id)
  return Math.max(...productIds)
}

export const AddProductModal: React.FC<Props> = ({ handleClickForm }) => {
  const [product, setProduct] = useState(defaultProduct)
  const dispatch = useAppDispatch()
  const { products } = useAppSelector(state => state.products)
  const biggestId = useMemo(() => {
    return findBiggestId(products)
  }, [products])

  const isFieldEmpty = (field: string | number) => {
    if (typeof field === "string") {
      return field.trim().length === 0
    }
    if (typeof field === "number") {
      return field === 0;
    }
  };

  const isButtonDisabled =
    isFieldEmpty(product.name) ||
    isFieldEmpty(product.count) ||
    isFieldEmpty(product.size.width) ||
    isFieldEmpty(product.size.height);
  isFieldEmpty(product.weight)

  const clearForm = () => {
    setProduct(defaultProduct);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProduct(prevProduct => ({ ...prevProduct, id: biggestId + 1 }));
    dispatch(createProduct(product));
    clearForm()
  }

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct(prevProduct => ({ ...prevProduct, [field]: value }));
  };

  const handleChangeWidth = (value: number) => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      setProduct(prevProduct => ({ ...prevProduct, size: { ...prevProduct.size, width: value } }));
    }
  }
  const handleChangeHeight = (value: number) => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      setProduct(prevProduct => ({ ...prevProduct, size: { ...prevProduct.size, height: value } }));
    }
  }

  return (
    <div className="flex flex-col p-12 border-2 border-slate-200 rounded-lg bg-slate-50">
      <h3 className="font-bold text-2xl">Add your product</h3>
      <hr className="border-2 border-slate-600 rounded-sm mb-2 mt-4" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="form-field-block">
          <label htmlFor="name" className="field-name">Product name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => {
              handleChange('name', e.target.value)
            }}
            placeholder="Enter product`s name"
            className="form-field" />
        </div>

        <div className="form-field-block">
          <label htmlFor="image" className="field-name">Product image</label>
          <input
            className="form-field"
            value={product.imageUrl}
            onChange={(e) => {
              handleChange('imageUrl', e.target.value)
            }}
            type="text"
            placeholder="Paste product`s image URL or leave empty" />
        </div>

        <div className="form-field-block">
          <label htmlFor="count" className="field-name">Count</label>
          <input
            type="text"
            value={product.count}
            onChange={(e) => {
              handleChange('count', e.target.value)
            }}
            placeholder="Enter count of products"
            className="form-field" />
        </div>

        <div>
          <h4 className="font-bold text-xl">Size</h4>
          <div className="form-field-block flex-row border-2 border-slate-600 pt-1 pb-2 pr-2 pl-2 rounded-md">
            <div className="flex flex-col items-center">
              <label htmlFor="width" className="field-name">Width</label>
              <input
                type="text"
                placeholder="Enter width"
                value={product.size.width}
                onChange={(e) => {
                  handleChangeWidth(Number(e.target.value))
                }}
                className="form-field text-center" />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="height" className="field-name">Hight</label>
              <input
                type="text"
                placeholder="Enter height"
                value={product.size.height}
                onChange={(e) => {
                  handleChangeHeight(Number(e.target.value))
                }}
                className="form-field text-center" />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <button className="flex w-full justify-center items-center bg-red-600 pt-2 pb-2 pr-3 pl-3 rounded-md text-cyan-50 font-semibold" onClick={handleClickForm}>
            Cancel
          </button>
          <button disabled={isButtonDisabled}
            className={classNames("flex w-full justify-center items-center bg-blue-600 pt-2 pb-2 pr-3 pl-3 rounded-md text-cyan-50 font-semibold", { "bg-blue-400": isButtonDisabled })} onClick={handleClickForm}>
            Create
          </button>
        </div>
      </form >
    </div >
  )
}