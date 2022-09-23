import {useState,useEffect} from "react";
import Link from "next/link";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    return windowSize;
}


const Results = ({results,time,delay,media})=>{


    const size = useWindowSize();
    console.log(size.width);
    var slidesPerViewNum=6;
    if (size.width >=1536)  slidesPerViewNum = 7
    else if (size.width <=1536 && size.width >=1280)  slidesPerViewNum = 6
    else if (size.width <=1280 && size.width >=1024)  slidesPerViewNum = 5
    else if (size.width <=1024 && size.width >=800)  slidesPerViewNum = 4
    else if ((size.width <=800 && size.width >=768) || (size.width <=625))  slidesPerViewNum = 3
    else if (size.width <=768)  slidesPerViewNum = 4
    return(
        <Swiper
            slidesPerView={slidesPerViewNum}
            spaceBetween={20}
            speed={time}
            autoplay={{
                delay: delay,
                disableOnInteraction: true,
                pauseOnMouseEnter:false,
            }}
            loop={true}
            modules={[Navigation,Autoplay]}
            className="mySwiper w-full h-full top-50"
        >
            {
                results?.map(result => {

                        const posterLink = "https://image.tmdb.org/t/p/original"+ result?.poster_path.toString();
                        let link = media === "movie" ? "/movies/details?id="+result?.id :"/series/details?id="+result?.id;
                        var date;
                        date = result?.first_air_date || result?.release_date;
                        return (
                            <SwiperSlide  className="h-80">
                                <Link href={link}>
                                    <a >
                                        <div key={result?.id} id="resultBox" className="card3d 1460:w-52 1460:h-80 md:w-48 md:h-72 460:w-36 460:h-52  w-28 h-40 mx-5 my-3 rounded-lg shadowType2 relative cursor-pointer relative ">
                                            <div id="title" className=" opacity-0 duration-200 flex flex-col rounded-lg -space-y-1 text-baseColor backdrop-blur-sm  font-Signika z-10 w-full pb-0 pl-3 rounded-b-lg  bottom-0 absolute  text-white">
                                                <span className="font-bold md:text-sm text-xsm">{result?.title} {result?.name}</span>
                                                <span className="md:text-sm text-xsm text-baseColor/70" >{date?.substring(0,4)}</span>
                                            </div>
                                            <span className="absolute right-2 top-2 z-10 md:w-14 w-11 bg-black/40 pl-1 rounded-lg flex items-center justify-start text-baseColor font-Signika font-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="pl-1 text-xsm md:text-sm">
                                                        {result?.vote_average.toFixed(1)}
                                                    </span>
                                                </span>
                                            <img src={posterLink} id="resultImg" className="w-full h-full rounded-lg absolute z-0"/>
                                            <div id="middle" className="z-30 text-baseColor w-full h-rb px-2 -pt-5 pb-8 md:text-sm text-xsm overflow-auto font-Signika absolute">
                                                    <span>
                                                        {result?.overview}
                                                    </span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </SwiperSlide>
                        )
                    }
                )
            }
        </Swiper>
    )
}

export default function Content(){

    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [popularMoviesData, setPopularMoviesData] = useState([]);
    const [popularTvData, setPopularTvData] = useState([]);
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [topRatedTvData, setTopRatedTvData] = useState([]);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        try{

            const key = process.env.NEXT_PUBLIC_API_KEY;

            const responsePopMovieUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopMovie =  await fetch(responsePopMovieUrl);
            const dataPopMovie = await responsePopMovie.json();
            let popMovie = dataPopMovie.results.slice(0,15);

            const responsePopTvUrl = "https://api.themoviedb.org/3/tv/popular?api_key="+key+"&language=en-US&page=1";
            const responsePopTv =  await fetch(responsePopTvUrl);
            const dataPopTv = await responsePopTv.json();
            let popTv = dataPopTv.results.slice(0,15);

            const responseRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedMovie =  await fetch(responseRatedMovieUrl);
            const dataRatedMovie = await responseRatedMovie.json();
            let ratedMovie = dataRatedMovie.results.slice(0,15);

            const responseRatedTvUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key="+key+"&language=en-US&page=1";
            const responseRatedTv =  await fetch(responseRatedTvUrl);
            const dataRatedTv = await responseRatedTv.json();
            let ratedTv = dataRatedTv.results.slice(0,15);

            const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key="+key+"&language=en-US&page=1";
            const responseUpcomingMovies =  await fetch(upcomingMoviesUrl);
            const dataUpcomingMovies = await responseUpcomingMovies.json();
            let upcomingMovies = dataUpcomingMovies.results.slice(0,15);

            setPopularMoviesData(popMovie);
            setPopularTvData(popTv);
            setTopRatedMoviesData(ratedMovie);
            setTopRatedTvData(ratedTv);
            setUpcomingMoviesData(upcomingMovies);
        }
        catch (err){
            console.log(err);
        }
    };


    const popularMoviesResults = [];
    const popularTvResults = [];
    const topRatedMoviesResults = [];
    const topRatedTvResults = [];
    const upcomingMoviesResults = [];
    for(var i=0;i<15;i++){
        popularMoviesResults.push(popularMoviesData[i]);
        popularTvResults.push(popularTvData[i]);
        topRatedMoviesResults.push(topRatedMoviesData[i]);
        topRatedTvResults.push(topRatedTvData[i]);
        upcomingMoviesResults.push(upcomingMoviesData[i]);

    }

    return(
        <div id="content" className="py-4 flex flex-col space-y-10 mt-10 pb-10">
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Upcoming Movies</h1>
                <Results results ={upcomingMoviesResults} time={1700} delay={1000} media={"movie"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Popular Movies</h1>
                <Results results ={popularMoviesResults} time={2000} delay={1500} media={"movie"}/>
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Popular Series</h1>
                <Results results ={popularTvResults} time={2000} delay={2000} media={"tv"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Top Rated Movies</h1>
                <Results results ={topRatedMoviesResults} time={3000}  delay={3000} media={"movie"} />
            </div>
            <div className="w-sb mx-8">
                <h1 className="font-Signika text-3xl text-baseColor font-bold mb-0">Top Rated Series</h1>
                <Results results ={topRatedTvResults} time={4000}  delay={4000} media={"tv"} />
            </div>

        </div>
    )


}