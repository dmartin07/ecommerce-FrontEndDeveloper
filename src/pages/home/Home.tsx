import styles from "./Home.module.css";
import { CardProduct } from "../../components/ui/CardProduct";
import { Hero } from "../../components/ui/Hero";
import { getProducts } from "../../service";
import { Toaster } from "sonner";
import { useQuery } from "react-query";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const {data = [], isLoading, error} = useQuery(
    ["products", page],
    () => getProducts(page),
    {keepPreviousData: true}
  );

  {
    /*
    Before, not using react query

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  

  useEffect(() => { 
    getProducts().then((data) => {
      setProducts(data);
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  },[])
  */
  }

  return (
    <>
      <Hero />
      <Toaster richColors />
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <div className={styles.container}>
        {data?.map((product) => (
          <CardProduct key={product.tail} product={product} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          previus page
        </button>
        <div className={styles.paginationActive}>
          <span>{page}</span>
        </div>
        <button
          onClick={() => setPage(page + 1)}
          className={styles.paginationButton}
        >
          next page
        </button>
      </div>
    </>
  );
};

export default Home;
