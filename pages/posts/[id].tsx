import Head from 'next/head';

import { PostsIdParam, PostMetadata } from '@/types';
import { getAllPostIds, getPostData } from '@/lib/post';
import Date from '@/components/date';
import Layout from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';

export default function Post({ postData }: { postData: PostMetadata }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml &&
          <>
            <br />
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
          </>
        }
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: PostsIdParam }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}