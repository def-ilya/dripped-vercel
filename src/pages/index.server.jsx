import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';
import Navigation from '../components/Navigation.client';
import Disclaimer from '../components/Disclaimer.client';

export default function Index({country = {isoCode: 'US'}}) {
  return (
    <>
      <Disclaimer />
      <Layout>
        <Welcome />
        <Suspense fallback={null}>
          <SeoForHomepage />
        </Suspense>
        <div className="relative mb-6">
          {/* <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />

        </Suspense> */}
          <Suspense fallback={<BoxFallback />}>
            <FeaturedProductsBox country={country} />
          </Suspense>
        </div>
      </Layout>
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {
        name: shopName,
        primaryDomain: {url: shopUrl},
      },
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: shopName,
        url: shopUrl,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-white p-12 shadow-md  mb-10">
      {/* <Navigation collections={collections} storeName="" /> */}
      <Navigation collections={collections} />

      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              {/* {featuredProductsCollection.title} */}
            </span>
            {/* <span className="hidden md:inline-flex">
                <Link
                  to={`/collections/${featuredProductsCollection.handle}`}
                  className="text-blue-600 hover:underline"
                >
                  Shop all
                </Link>
              </span> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
  }
`;

const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 24
    $numProducts: Int = 24
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
