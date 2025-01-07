import CategoryNav from '@/components/category-nav'
import DynamicCarousel from '@/components/Carousel'
import AllProductPage from '@/components/AllProductPage';
export default function HomePage(){
    return(
        <div>           
            <DynamicCarousel />
            <CategoryNav />
            <AllProductPage/>;  
        </div>
    );
}