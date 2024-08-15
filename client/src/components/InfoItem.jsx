// const infoItems = [
//   {
//     id: 1,
//     title: 'learn',
//     subtitle:
//       '專案經驗: 2016-2018 薪世代畢業專題製作 - 動畫剪輯製作 十二年國教知多少、走入街頭抗議的流浪教師-動畫製作 皮諾丘的眼淚 -執行製片 實習經驗: 2017.07-2017.08 台南文化創意園區.藝地人專案-攝影、剪輯、企劃 參賽經驗: 2015 校內比賽-交通安全藝文競賽-第三名 校內比賽-環保再生造型創意競賽-佳作獎',
//     text: '',
//   },
//   { id: 2, title: 'work', subtitle: '123' },
//   { id: 3, title: 'skill', text: '文字' },
//   { id: 4, title: 'exp', text: '文字' },
// ];
function InfoItem() {
  return (
    // <div className='absolute inset-0 border border-blue-500'>
    //   <div className='w-2/5 h-fit border-2 border-black p-3 relative'>
    //     <div className=' capitalize bg-white border-black border p-4'>
    //       <ul className='list-none w-full h-full flex flex-col justify-center items-center '>
    //         {infoItems.map((item) => (
    //       <li key={item.id} className='w-full h-full flex '>
    //         <div className='w-2/5 h-fit border-2 border-black p-3 relative'>
    //           <div className=' capitalize bg-white border-black border p-4'>
    //             <span className='block'>{item.title}</span>
    //             <span className='block'>{item.subtitle}</span>
    //           </div>
    //         </div>
    //       </li>
    //     ))}

    //         <li>
    //           <span className='block'>learn</span>
    //           <span className='block'>
    //             專案經驗: 2016-2018 薪世代畢業專題製作 - 動畫剪輯製作
    //             十二年國教知多少、走入街頭抗議的流浪教師-動畫製作 皮諾丘的眼淚
    //             -執行製片 實習經驗: 2017.07-2017.08
    //             台南文化創意園區.藝地人專案-攝影、剪輯、企劃 參賽經驗: 2015
    //             校內比賽-交通安全藝文競賽-第三名
    //             校內比賽-環保再生造型創意競賽-佳作獎
    //           </span>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <div className='absolute w-11/12 h-[160vh] top-56 m-auto flex flex-col justify-between inset-0'>
      {/* 第一區塊：學習經歷 */}
      <div className='flex items-start justify-end'>
        <div className='bg-[#f5f3e6] p-4 border-2 border-black rounded-lg shadow-lg flex'>
          <div className='mr-10'>
            <h2 className='font-bold text-lg'>學習經歷</h2>
            <p>2016.02-2018.07</p>
            <p>南臺科技大學資訊傳播系</p>
          </div>

          <div className='mt-6 space-y-4 text-sm leading-relaxed '>
            <p>
              <span className='font-bold'>專案經驗:</span>
              <ul className='list-disc pl-4'>
                <li>2016-2018 薪世代畢業專題製作 - 動畫剪輯製作</li>
                <li>十二年國教知多少、走入街頭抗議的流浪教師 - 動畫製作</li>
                <li>皮諾丘的眼淚 - 執行製片</li>
              </ul>
            </p>
            <p>
              <span className='font-bold'>實習經驗:</span>
              <br></br> 2017.07-2017.08 台南文化創意園區.藝地人專案 -
              攝影、剪輯、企劃
            </p>
            <p>
              <span className='font-bold'>參賽經驗:</span>
              <br></br>校內比賽 - 交通安全藝文競賽 - 第三名<br></br> 校內比賽 -
              環保再生造型創意競賽 - 佳作獎
            </p>
          </div>
        </div>
      </div>

      {/* 第二區塊：工作經驗 */}
      <div className='flex items-center justify-start'>
        <div className='bg-[#f5f3e6] p-4 border-2 border-black rounded-lg shadow-lg flex'>
          <div className='mr-10'>
            <h2 className='font-bold text-lg'>學習經歷</h2>
            <p>2016.02-2018.07</p>
            <p>南臺科技大學資訊傳播系</p>
          </div>

          <div className='mt-6 space-y-4 text-sm leading-relaxed '>
            <p>
              <span className='font-bold'>專案經驗:</span>
              <ul className='list-disc pl-4'>
                <li>2016-2018 薪世代畢業專題製作 - 動畫剪輯製作</li>
                <li>十二年國教知多少、走入街頭抗議的流浪教師 - 動畫製作</li>
                <li>皮諾丘的眼淚 - 執行製片</li>
              </ul>
            </p>
            <p>
              <span className='font-bold'>實習經驗:</span>
              <br></br> 2017.07-2017.08 台南文化創意園區.藝地人專案 -
              攝影、剪輯、企劃
            </p>
            <p>
              <span className='font-bold'>參賽經驗:</span>
              <br></br>校內比賽 - 交通安全藝文競賽 - 第三名<br></br> 校內比賽 -
              環保再生造型創意競賽 - 佳作獎
            </p>
          </div>
        </div>
      </div>

      {/* 第三區塊：技能 */}
      <div className='flex items-end justify-end'>
        <div className='bg-[#f5f3e6] p-4 border-2 border-black rounded-lg shadow-lg flex'>
          <div className='mr-10'>
            <h2 className='font-bold text-lg'>學習經歷</h2>
            <p>2016.02-2018.07</p>
            <p>南臺科技大學資訊傳播系</p>
          </div>

          <div className='mt-6 space-y-4 text-sm leading-relaxed '>
            <p>
              <span className='font-bold'>專案經驗:</span>
              <ul className='list-disc ml-6'>
                <li>2016-2018 薪世代畢業專題製作 - 動畫剪輯製作</li>
                <li>十二年國教知多少、走入街頭抗議的流浪教師 - 動畫製作</li>
                <li>皮諾丘的眼淚 - 執行製片</li>
              </ul>
            </p>
            <p>
              <span className='font-bold'>實習經驗:</span>
              <br></br> 2017.07-2017.08 台南文化創意園區.藝地人專案 -
              攝影、剪輯、企劃
            </p>
            <p>
              <span className='font-bold'>參賽經驗:</span>
              <br></br>校內比賽 - 交通安全藝文競賽 - 第三名<br></br> 校內比賽 -
              環保再生造型創意競賽 - 佳作獎
            </p>
          </div>
        </div>
      </div>

      {/* 第四區塊：證照 */}
      <div className='flex items-end justify-start'>
        <div className='bg-[#f5f3e6] p-4 border-2 border-black rounded-lg shadow-lg flex'>
          <div className='mr-10'>
            <h2 className='font-bold text-lg'>學習經歷</h2>
            <p>2016.02-2018.07</p>
            <p>南臺科技大學資訊傳播系</p>
          </div>

          <div className='mt-6 space-y-4 text-sm leading-relaxed '>
            <p>
              <span className='font-bold'>專案經驗:</span>
              <ul className='list-disc ml-6'>
                <li>2016-2018 薪世代畢業專題製作 - 動畫剪輯製作</li>
                <li>十二年國教知多少、走入街頭抗議的流浪教師 - 動畫製作</li>
                <li>皮諾丘的眼淚 - 執行製片</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoItem;
