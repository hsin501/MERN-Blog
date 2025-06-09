import { MdOutlineMenuBook, MdWork } from 'react-icons/md';

function InfoItem() {
  return (
    // <div className='absolute inset-0 border border-blue-500'>

    <div className='absolute inset-0 w-full h-full p-4 flex flex-col justify-between'>
      {/* 第一區塊：學習經歷 */}
      <div className='flex items-start justify-end sm:justify-end max-w-[90%] sm:max-w-[45%] w-full ml-auto mt-56'>
        <div className='bg-[#f5f3e6] px-4 py-2 border-2 border-black rounded-lg shadow-lg flex ]'>
          <div className='mr-14 sm:mr-2'>
            <div className='mr-10 flex items-center'>
              <MdOutlineMenuBook />
              <h2 className='font-bold text-lg ml-2'>就學經歷</h2>{' '}
            </div>
            <div className=''>
              <p className='pl-6 mt-2'>2016-2018</p>
              <p className='pl-6'>南臺科技大學 資訊傳播系</p>
              <br></br>
              <p className='pl-6 mt-2'>2014-2016</p>
              <p className='pl-6'>遠東科技大學 工業設計系</p>
            </div>
          </div>

          <div className='mt-8 space-y-4 text-sm leading-relaxed border-l-2 border-gray-400 pl-6 '>
            <p>
              <span className='font-bold'>專案經驗</span>
              <ul className='list-disc pl-4'>
                <li>薪世代畢業專題製作 - 動畫剪輯製作</li>
                <li>十二年國教知多少、走入街頭抗議的流浪教師 - 動畫製作</li>
                <li>皮諾丘的眼淚 - 執行製片</li>
              </ul>
            </p>
            <p>
              <span className='font-bold'>實習經驗</span>
              <br></br>
              <li>台南文化創意園區.藝地人專案 - 攝影、剪輯、企劃</li>
            </p>
          </div>
        </div>
      </div>

      {/* 第二區塊：工作經驗 */}
      <div className='flex items-center justify-start max-w-[90%] sm:max-w-[45%] w-full'>
        <div className='bg-[#f5f3e6] px-4 py-2 border-2 border-black rounded-lg shadow-lg'>
          <div className='mr-10  flex items-center'>
            <MdWork />
            <h2 className='font-bold text-lg ml-2'>專案經歷</h2>{' '}
          </div>
          <div className='flex flex-col mt-4'>
            <div className='text-basic leading-relaxed flex flex-col'>
              <p className=''>2023/08-2025/06 ‖&nbsp;&nbsp;自學前端技術</p>
              <p className='text-xs'>&nbsp; </p>
            </div>
            <div className='text-sm'>
              <ul className='custom-list'>
                <li>運用MERN等技術，進行此部落格製作，包含前後端。</li>
                <li>
                  學習網頁前端技術
                  Javascript、React、NodeJS、Redux、Gsap、Vite、Express、Tailwind、Less、MongoDB、THREE
                  JS
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col mt-4'>
            <div className='text-basic leading-relaxed flex flex-col'>
              <p className=''>
                2022/12-2023/05 ‖&nbsp;&nbsp;跨域Java軟體工程師就業養成班
              </p>
              <p className='text-xs'>資展國際股份有限公司(原資策會)</p>
            </div>
            <div className='text-sm pt-1'>
              <ul className='list-disc pl-4'>
                <li>運用JAVA(JSP)、SpringBoot等後端技術，製作後台功能</li>
                <li>運用Git/GitHub進行版本控管及多人協作</li>
              </ul>
            </div>
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
