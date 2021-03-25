import Link from 'next/link'
import { getShopwareApi, getSlugFromTitle } from '../config/shopware'

export default function Products({ products }) {
  return (
    <>
      {!products.length && (
        <>
          No products found!
        </>
      )}

      {products.length && (
        <div>
          {products.map(product => (
            <>
              <Link href={`/products/${getSlugFromTitle(product.name)}`} key={product.id}>
                <a>
                  <h2>{product.name}</h2>
                  <p>
                    {product.description}
                  </p>
                </a>
              </Link>
            </>
          ))}
        </div>
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
      props: { products },
    }
  } catch (error) {
    console.error(error)
    const products = []

    return { props: products }
  }
}
