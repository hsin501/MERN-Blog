// import gsap from 'gsap';
// import { Draggable } from 'gsap/Draggable';
// import { useEffect, useState, useRef, useMemo } from 'react';
// import Loading from './loading';
// import bg from '/project_bg.png';
// import '../../src/index.css';
// gsap.registerPlugin(Draggable);

// export default function Carousel() {
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!isLoading && carouselRef.current) {
//       gsap.fromTo(
//         carouselRef.current,
//         { autoAlpha: 0, scale: 0.9 },
//         { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
//       );
//     }
//   }, [isLoading]);

//   const items = useMemo(
//     () => [
//       {
//         id: 1,
//         image: '/test.png',
//         text: '圖片 1',
//         projectname: '測試測試網站',
//         projectintro: 'aaaaaaaaaaaaaaaaaaaaa',
//         url: 'https://www.google.com/',
//       },
//       {
//         id: 2,
//         image: 'https://via.placeholder.com/600x400',
//         text: '圖片 2',
//         projectname: 'bbb',
//         projectintro:
//           'BBBbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
//         url: 'https://www.bing.com/',
//       },
//       {
//         id: 3,
//         image: 'https://via.placeholder.com/600x400',
//         text: '圖片 3',
//         projectname: 'ccc',
//         projectintro: 'cccccccccccccccccccccc',
//         url: 'https://tw.yahoo.com/?p=us',
//       },
//       {
//         id: 4,
//         image: 'https://via.placeholder.com/600x400',
//         text: '圖片 4',
//         projectname: 'ddd',
//         projectintro: 'dddddddddddddddddddddd',
//         url: '',
//       },
//       {
//         id: 5,
//         image: 'https://via.placeholder.com/600x400',
//         text: '圖片 5',
//         projectname: 'eee',
//         projectintro: 'eeeeeeeeeeeeeeeeeeeee',
//         url: '',
//       },
//       {
//         id: 6,
//         image: 'https://via.placeholder.com/600x400',
//         text: '圖片 6',
//         projectname: 'fff',
//         projectintro: 'fffffffffffffffffffffff',
//         url: '',
//       },
//     ],
//     []
//   );

//   //重複項目數量
//   const extendedItems = useMemo(() => {
//     const repeatedItems = [];
//     for (let i = 0; i < 2; i++) {
//       repeatedItems.push(...items);
//     }
//     return repeatedItems;
//   }, [items]);

//   const carouselRef = useRef(null); //引用輪播的dom元素
//   const rotationAnimation = useRef(null); //引用旋轉動畫

//   useEffect(() => {
//     if (!carouselRef.current || isLoading) return;

//     const quantity = extendedItems.length; // 獲取數量
//     const carouselItems = carouselRef.current.children; // 獲取所有輪播元素
//     const radius = 1000; // 設定旋轉的半徑
//     const rotationAngle = 360 / quantity; //卡片數量均勻分佈旋轉角度

//     Array.from(carouselItems).forEach((item, index) => {
//       gsap.set(item, {
//         rotationY: index * rotationAngle,
//         transformOrigin: `50% 50% ${-radius}px`,
//       });
//     });

//     // 旋轉動畫
//     rotationAnimation.current = gsap.fromTo(
//       carouselRef.current,
//       {
//         rotationY: rotationAngle,
//       },
//       {
//         rotationY: '-=360',
//         duration: 100,
//         repeat: -1,
//         ease: 'none',
//         transformOrigin: '50% 50% ' + -radius + 'px',
//       }
//     );
//   }, [extendedItems, isLoading]);

//   //緩速
//   const slowDownRotation = () => {
//     gsap.to(rotationAnimation.current, {
//       timeScale: 0,
//       duration: 1, // 動畫減速的持續時間，可以根據需要調整
//       ease: 'power2.out', // 使用緩動函數使減速更自然
//     });
//   };
//   //加速
//   const speedUpRotation = () => {
//     gsap.to(rotationAnimation.current, {
//       timeScale: 1,
//       duration: 1, // 動畫加速的持續時間，可以根據需要調整
//       ease: 'power2.in', // 使用緩動函數使加速更自然
//     });
//   };
//   //點擊跳轉
//   const clickProjectHandler = (url) => {
//     window.location.href = url;
//   };
//   //滑鼠移入慢慢降速
//   const handleMouseEnter = (index) => {
//     slowDownRotation();

//     gsap.to(carouselRef.current.children[index], {
//       z: 40,
//       duration: 0.3,
//     });
//   };
//   //滑鼠移出慢慢加速
//   const handleMouseLeave = (index) => {
//     speedUpRotation();
//     gsap.to(carouselRef.current.children[index], {
//       z: 0,
//       duration: 0.3,
//     });
//   };

//   return (
//     <div className='w-full h-full object-cover relative  perspective-1000 overflow-hidden bg-gray-300'>
//       {/* <img src={bg} alt='Background' /> */}
//       {isLoading ? (
//         <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-110'>
//           <Loading />
//         </div>
//       ) : (
//         <>
//           <div
//             className='absolute flex justify-center items-center preserve-3d bottom-[28rem] left-1/2 transform translate-x-[-50%] cursor-grab active:cursor-grabbing'
//             ref={carouselRef}
//             style={{
//               transform: 'translateZ(1200px)',
//               backfaceVisibility: 'visible',
//             }}
//           >
//             {extendedItems.map((item, index) => (
//               <div
//                 className='bg-gray-100 dark:bg-gray-500 absolute carousel-item w-[26rem] h-[32rem] cursor-pointer hover:shadow-xl rounded-lg border border-gray-300 dark:border-gray-600'
//                 key={index}
//                 style={{
//                   transform: 'rotateY(180deg) scaleX(-1)',
//                 }}
//                 onMouseEnter={() => handleMouseEnter(index)}
//                 onMouseLeave={() => handleMouseLeave(index)}
//               >
//                 <div
//                   className='w-full py-2 px-2 h-full '
//                   onClick={() => clickProjectHandler(item.url)}
//                 >
//                   <img src={item.image} alt='' loading='lazy' />
//                   <p className='py-2 px-2 pt-4 text-center text-3xl'>
//                     {item.projectname}
//                   </p>
//                   <p className='pt-2 px-2 text-center text-xl whitespace-normal break-words overflow-hidden'>
//                     {item.projectintro}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
