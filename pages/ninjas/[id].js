import { useRouter } from "next/router";

const SingleNinJA = ({ ninja }) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="detail">{ninja?.name}</h1>
      <p>{ninja?.email}</p>
      <p>{ninja?.website}</p>
      <p>{ninja?.address?.city}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const paths = data.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const ninjaId = context.params.id;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${ninjaId}`
  );
  const data = await res.json();

  return { props: { ninja: data } };
};

export default SingleNinJA;
