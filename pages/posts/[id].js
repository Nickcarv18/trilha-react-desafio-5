import { getGlobalData } from '../../utils/global-data';
import {
  getPostBySlug,
} from '../../utils/mdx-utils';

import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';


const components = {
  a: CustomLink,
  Head,
};

export default function PostPage({
  posts,
  globalData,
}) {
  return (
    <Layout>
      <SEO
        title={`${posts[0].title} - ${globalData.name}`}
        description={posts[0].description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {posts[0]?.title}
          </h1>
          {posts[0]?.description && (
            <p className="text-xl mb-4">{posts[0]?.description}</p>
          )}
        </header>
        <main>
          <article className="prose dark:prose-dark">
            {posts[0].body}
          </article>
        </main>
        <div className="mt-16 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 md:w-[200px]">
          <Link 
             as={`/`}
             href={`/`}>
              <a className='py-6 px-6 flex focus:outline-none focus:ring-4'>
                <ArrowIcon className="mx-auto mt-auto transform rotate-180 md:me-0 ml-0" />
                Voltar
              </a>
          </Link>
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const globalData = getGlobalData();
  const posts = await getPostBySlug(params.id);
 
  return {
    props: {
      globalData,
      posts,
    },
  };
};

