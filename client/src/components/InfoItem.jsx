/* eslint-disable react/prop-types */
import { MdCode, MdSchool, MdConstruction } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MilestoneCard = ({ icon, title, subtitle, children, animationDelay }) => (
  <div className={`milestone-card w-full max-w-lg`} style={{ animationDelay }}>
    <div className='flex items-start'>
      <div className='bg-slate-800/50 p-2 rounded-lg mr-4 mt-1'>
        <span className='text-sky-300'>{icon}</span>
      </div>
      {/* 標題與副標題區 */}
      <div className='flex-1'>
        <h2 className='font-bold text-xl tracking-wider'>{title}</h2>
        {subtitle && <p className='mt-1 text-xs text-gray-400'>{subtitle}</p>}
      </div>
    </div>

    {/* 內容區 */}
    <div className='mt-5 sm:pl-[52px] text-sm leading-relaxed text-gray-200'>
      {children}
    </div>
  </div>
);

function InfoItem() {
  const frontendSkills = [
    'HTML',
    'CSS',
    'JavaScript (ES6+)',
    'React',
    'Redux',
    'Tailwind CSS',
    'GSAP',
    'Three.js',
  ];
  const backendSkills = [
    'Node.js',
    'Express',
    'Java',
    'Spring Boot',
    'MSSQL',
    'MongoDB',
    'RESTful API',
  ];
  const designAndTools = [
    'Git & GitHub',
    'Vercel',
    'vite',
    'VSCode',
    'Photoshop',
    'Premiere',
    'After Effects',
  ];

  return (
    <div className='absolute inset-0 flex flex-col justify-around py-4'>
      {/* --- 第一幕: 奠基與啟發  --- */}
      <div
        className='
          absolute top-[5%] left-0 animate-float-in
          w-full flex justify-center
          md:w-1/2 md:justify-end md:pr-16
        '
        style={{ animationDelay: '0.2s' }}
      >
        <MilestoneCard
          icon={<MdSchool size={24} />}
          title='奠基與啟發'
          subtitle='從視覺敘事到工程邏輯，一段尋找熱情的跨域之旅。'
        >
          <div className='space-y-4'>
            <div>
              <p className='font-semibold text-sky-300'>
                2023 ‖ 軟體工程師養成班 (資策會)
              </p>
              <p className='text-xs text-gray-400'>
                透過系統化的 Java
                與後端開發訓練，第一次體會到「把想法變成能運作的系統」的成就感。
                在團隊專案中，我學會了如何從需求拆解到實作，真正走進軟體開發的世界。
              </p>
            </div>
            <div>
              <p className='font-semibold text-sky-300'>
                2018 - 2022 ‖ 職涯探索與定向
              </p>
              <p className='text-xs text-gray-400'>
                那幾年嘗試過影視剪輯與設計，也曾準備國考。雖然方向多變，但每一次經驗都讓我更確定：
                我熱愛的是「從無到有地創造」，無論是畫面還是程式。
              </p>
            </div>
            <div>
              <p className='font-semibold text-sky-300'>
                - 2018 ‖ 南臺科大 資訊傳播系
              </p>
              <p className='text-xs text-gray-400'>
                在設計與多媒體的訓練中，培養了對畫面美感的敏銳度。
                這份美感與敘事能力，也成為我之後開發產品時的重要養分。
              </p>
            </div>
          </div>
        </MilestoneCard>
      </div>

      {/* --- 第二幕: 淬鍊與實踐  --- */}
      <div
        className='
          absolute top-[30%] left-0 animate-float-in
          w-full flex justify-center
          md:w-auto md:left-1/2 md:justify-start md:pl-16
        '
        style={{ animationDelay: '0.6s' }}
      >
        <MilestoneCard
          icon={<MdConstruction size={24} />}
          title='淬鍊與實踐'
          subtitle='密集自主開發期 (2023下半年 - 至今)'
          className={`
          milestone-card top-[30%]
          w-[90%] left-1/2 -translate-x-1/2
          md:w-auto md:max-w-lg md:left-[calc(50%+4rem)] md:translate-x-0
        `}
          animationDelay='0.6s'
        >
          <p>
            課程結束後，我主動持續學習並累積實戰經驗，將理論轉化為實戰能力，獨立完成了超過
            6+ 個專案深化 React 與 Node.js 技術，並理解資料庫與 API 串接流程。
          </p>
          <ul className='list-disc pl-4 mt-3 space-y-1 text-xs'>
            <li>獨立開發此部落格網站 (React + Node.js)</li>
            <li>團隊協作專案經驗 (Java + Spring Boot)</li>
            <li>涵蓋 API 串接、資料庫設計等多樣化主題</li>
          </ul>
          <div className='mt-4 flex gap-4'>
            <Link
              to='/projects'
              className='inline-block mt-4 bg-amber-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-amber-200 transition-all'
            >
              → My projects
            </Link>

            <a
              href='https://github.com/hsin501'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block mt-4 bg-amber-300 text-slate-900 px-4 py-2 rounded-xl hover:bg-amber-200 transition-all'
            >
              → GitHub 專案庫
            </a>
          </div>
        </MilestoneCard>
      </div>

      {/* --- 第三幕: 技術 --- */}
      <div
        className='
          absolute top-[60%] left-0 animate-float-in
          w-full flex justify-center
          md:w-1/2 md:justify-end md:pr-16
        '
        style={{ animationDelay: '1.0s' }}
      >
        <MilestoneCard
          icon={<MdCode size={24} />}
          title='技術全貌'
          subtitle='前後端整合能力，持續進化的開發工具箱。'
          className={`
          milestone-card top-[60%]
          w-[90%] left-1/2 -translate-x-1/2
          md:w-auto md:max-w-lg md:left-auto md:right-[calc(50%+4rem)] md:translate-x-0
        `}
          animationDelay='1.0s'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
            {/* 前端欄位 */}
            <div>
              <h3 className='font-semibold text-sky-300 mb-2 border-b border-sky-900 pb-1'>
                前端開發
              </h3>
              <ul className='list-none mt-2 space-y-1 text-gray-300'>
                {frontendSkills.map((skill) => (
                  <li key={skill}>- {skill}</li>
                ))}
              </ul>
            </div>

            {/* 後端欄位 */}
            <div>
              <h3 className='font-semibold text-sky-300 mb-2 border-b border-sky-900 pb-1'>
                後端開發
              </h3>
              <ul className='list-none mt-2 space-y-1 text-gray-300'>
                {backendSkills.map((skill) => (
                  <li key={skill}>- {skill}</li>
                ))}
              </ul>
            </div>

            {/* 第三個分類 */}
            <div className='md:col-span-2'>
              <h3 className='font-semibold text-sky-300 mb-2 border-b border-sky-900 pb-1'>
                設計 & 工具
              </h3>
              <div className='flex flex-wrap gap-2 mt-2'>
                {designAndTools.map((skill) => (
                  <span key={skill} className='skill-tag'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MilestoneCard>
      </div>
    </div>
  );
}
export default InfoItem;
