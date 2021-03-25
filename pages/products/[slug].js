import { getShopwareApi, getSlugFromTitle } from '../../config/shopware'

export default function Product({ product }) {
  return (
    <>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </>
  )
}

export async function getStaticPaths() {
  const response = await getShopwareApi('product')
  const data = await response.json()
  const products = data.elements
  const paths = products.map(product => ({
    params: { slug: getSlugFromTitle(product.name) }
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await getShopwareApi('product')
    const data = await response.json()
    const products = data.elements
    const product = products.find(product => getSlugFromTitle(product.name) === params.slug)

    return {
      props: { product },
    }
  } catch (error) {
    console.error(error)
    const product = {}

    return { props: product }
  }
}
