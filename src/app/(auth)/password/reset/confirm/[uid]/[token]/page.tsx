import dynamic from 'next/dynamic';

const ResetPasswordConfirm = dynamic(() => import('./client-page'), { ssr: false });

interface PageProps {
  params: {
    uid: string;
    token: string;
  };
}

export async function generateStaticParams() {
  const paths = [
    { uid: 'some-uid', token: 'some-token' },
  ];

  return paths.map(({ uid, token }) => ({
    uid,
    token,
  }));
}

const Page = ({ params }: PageProps) => {
  const { uid, token } = params;
  return <ResetPasswordConfirm uid={uid} token={token} />;
};

export default Page;
