import { getShopwareApi } from '../config/shopware'

export default function Products({ products }) {
  return (
    <>
      hello!
      {!products.length && (
        <>
          No products found!
        </>
      )}

      {products.length && (
        <ul>
          {products.map(product => (
            <li>
              <h2>{product.name}</h2>
              <p>
                {product.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export async function getStaticProps(context) {
  try {
    const response = await getShopwareApi('product')
    const data = await response.json()
    const products = data.elements

    return {
      props: { products: products },
    }
  } catch (error) {
    console.error(error)
    const products = []

    return { props: { products } }
  }
}
