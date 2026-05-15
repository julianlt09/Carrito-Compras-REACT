import { useContext, useEffect, useState } from "react"
import '../styles/CardComponent.css'
import { CartContext } from "../context/CartContext"

export const CardComponent = ({ id, image, title, description, price, handlerAdd, handlerRemove }) => {

  const { shoppingList } = useContext(CartContext)

  const [aded, setAded] = useState(false)

  const addProduct = () => {
    handlerAdd()
    setAded(true)
  }
  const removeProduct = () => {
    handlerRemove()
    setAded(false)
  }

  const checkAded = () => {
    const boolean = shoppingList.some(product => product.id == id)
    setAded(boolean)
  }


  useEffect(() => {
    checkAded()
  }, [])



  return (
    <div className="card">

      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>
        {
          aded
            ? <button
              type="button"
              className="remove-button"
              onClick={removeProduct}
            >
              Quitar del carrito
            </button>
            : <button
              type="button"
              className="add-button"
              onClick={addProduct}
            >
              Agregar al carrito
            </button>
        }

      </div>


    </div>
  )
}
