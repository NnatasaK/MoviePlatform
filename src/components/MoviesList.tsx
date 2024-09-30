/* import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Movie } from '../entities';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import { Navigation, Pagination } from 'swiper/modules';

const MoviesList: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data() as Movie);
        
        const trendingMoviesList = getRandomMovies(moviesList, 10);
        const remainingMovies = moviesList.filter(
          (movie) => !trendingMoviesList.includes(movie)
        );
        const recommendedMoviesList = getRandomMovies(remainingMovies, 10);

        setTrendingMovies(trendingMoviesList);
        setRecommendedMovies(recommendedMoviesList);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getRandomMovies = (movies: Movie[], count: number): Movie[] => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black text-white relative px-5 md:px-20">
      <h2 className="text-2xl font-bold mb-4 mt-20">Trending Movies</h2>
      <section className="flex space-x-4">
        {trendingMovies.length === 0 ? (
          <p>No trending movies available</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {trendingMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="group relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className=""
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm">
                      <strong>Year:</strong> {movie.year}
                    </p>
                    <p className="text-sm">
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p className="text-sm">
                      <strong>Rating:</strong> {movie.rating}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <h2 className="text-2xl font-bold mb-4 mt-16">Recommended Movies</h2>
      <section className="flex space-x-4">
        {recommendedMovies.length === 0 ? (
          <p>No recommended movies available</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {recommendedMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="group relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className=""
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-index-10000 duration-300">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm">
                      <strong>Year:</strong> {movie.year}
                    </p>
                    <p className="text-sm">
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p className="text-sm">
                      <strong>Rating:</strong> {movie.rating}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default MoviesList;  */

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Movie } from '../entities';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown  } from 'react-icons/fa';
import MovieButton from './ui/MovieButton';

const MoviesList: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data() as Movie);

        const trendingMoviesList = getRandomMovies(moviesList, 10);
        const remainingMovies = moviesList.filter(
          (movie) => !trendingMoviesList.includes(movie)
        );
        const recommendedMoviesList = getRandomMovies(remainingMovies, 10);

        setTrendingMovies(trendingMoviesList);
        setRecommendedMovies(recommendedMoviesList);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getRandomMovies = (movies: Movie[], count: number): Movie[] => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Utility function to convert rating labels
  const getDisplayRating = (rating: string): string => {
    switch (rating) {
      case 'R':
        return '17+';
      case 'PG-13':
        return '13+';
      case 'PG':
        return 'All Ages';
      default:
        return rating;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black text-white relative px-5 md:px-20">
      <h2 className="text-2xl font-bold mb-4 mt-20">Trending Movies</h2>
      <section className="flex space-x-4">
        {trendingMovies.length === 0 ? (
          <p>No trending movies available</p>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {trendingMovies.map((movie, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <Card className="group relative rounded-lg overflow-hidden transform transition text-white duration-300 hover:scale-110">
                      <CardContent className="flex items-center justify-center p-0">
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-full h-auto"
                        />
                        <div className="absolute h-40 bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         {/*  <h3 className="text-lg font-semibold">{movie.title}</h3> */}
                         <div className="flex  mb-6">
                            <MovieButton
                              icon={<FaPlay />}
                              label="Play"
                            />
                             <MovieButton
                              icon={<FaThumbsUp />}
                              label="Like"
                            />
                            <MovieButton
                              icon={<FaPlus />}
                              label="Add to My List"
                            />
                            <div className="ml-16">
                             <MovieButton
                              icon={<FaChevronDown />}
                              label="Info"
                             />
                            </div>
                          </div>

                          
                         {/*  <p className="text-sm">
                            <strong>Year:</strong> {movie.year}
                          </p> */}
                          
                          <span className="px-2 border-2 border-neutral-700 rounded-md ">
                            {/* <strong>Rating:</strong>  */}{getDisplayRating(movie.rating)}
                          </span>

                          <p className="text-sm mt-4 ">
                            {/* <strong>Genre:</strong> */} {movie.genre}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>

      <h2 className="text-2xl font-bold mb-4 mt-16">Recommended Movies</h2>
      <section className="flex space-x-4">
        {recommendedMovies.length === 0 ? (
          <p>No trending movies available</p>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {recommendedMovies.map((movie, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <Card className="group relative rounded-lg overflow-hidden transform transition text-white duration-300 hover:scale-110">
                      <CardContent className="flex items-center justify-center p-0">
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-full h-auto"
                        />
                        <div className="absolute h-40 bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         {/*  <h3 className="text-lg font-semibold">{movie.title}</h3> */}
                         <div className="flex  mb-6">
                            <MovieButton
                              icon={<FaPlay />}
                              label="Play"
                            />
                             <MovieButton
                              icon={<FaThumbsUp />}
                              label="Like"
                            />
                            <MovieButton
                              icon={<FaPlus />}
                              label="Add to My List"
                            />
                            <div className="ml-16">
                             <MovieButton
                              icon={<FaChevronDown />}
                              label="Info"
                             />
                            </div>
                          </div>

                          
                         {/*  <p className="text-sm">
                            <strong>Year:</strong> {movie.year}
                          </p> */}
                          
                          <span className="px-2 border-2 border-neutral-700 rounded-md ">
                            {/* <strong>Rating:</strong>  */}{getDisplayRating(movie.rating)}
                          </span>

                          <p className="text-sm mt-4 ">
                            {/* <strong>Genre:</strong> */} {movie.genre}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>
    </div>
  );
};

export default MoviesList;
