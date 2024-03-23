import { useEffect, useState } from "react";
import styles from "./Home.module.css"
import { CardProduct } from "../../components/ui/CardProduct";
import { Hero } from "../../components/ui/Hero";
import { getProducts } from "../../service";
import { Product } from "../../interface";

const Home = () => {
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

  return (
    <>
      <Hero />
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <div className={styles.container}>
        {products.map( (product) => (
          <CardProduct key={product.tail} product={product}/>
        ))}

      </div>
    </>
  );
};

export default Home;
