/* eslint-disable react/prop-types */
import { MdCode, MdSchool, MdConstruction } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MilestoneCard = ({ icon, title, subtitle, children, animationDelay }) => (
  <div className={`milestone-card w-full max-w-lg`} style={{ animationDelay }}>
    <div className='flex items-start'>
      {/* 圖標區：給圖標一個背景色，增加視覺層次和設計感 */}
      <div className='bg-slate-900 p-2 rounded-lg mr-4 mt-1'>
        <span className='text-cyan-400'>{icon}</span>
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
      {/* --- 第一幕: 奠基與啟發 (保持不變) --- */}
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
          {/* ... 內容不變 ... */}
          <div className='space-y-4'>
            <div>
              <p className='font-semibold text-cyan-300'>
                2023 ‖ 軟體工程師養成班 (資策會)
              </p>
              <p className='text-xs text-gray-400'>
                系統化學習 Java
                與後端開發，並於團隊專案中實作完整功能流程，奠定職場所需技能。
              </p>
            </div>
            <div>
              <p className='font-semibold text-cyan-300'>
                2018 - 2022 ‖ 職涯探索與定向
              </p>
              <p className='text-xs text-gray-400'>
                在多領域的嘗試中，從影視剪輯到國考準備，我逐漸釐清自己對「從無到有、建構事物」的熱情，最終驅使我走向軟體開發。
              </p>
            </div>
            <div>
              <p className='font-semibold text-cyan-300'>
                - 2018 ‖ 南臺科大 資訊傳播系
              </p>
              <p className='text-xs text-gray-400'>
                培養了設計美感與使用者體驗思維，成為我日後開發之路的獨特養分。
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
              className='inline-block mt-4 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-500/40 transition-all'
            >
              → My projects
            </Link>

            <a
              href='https://github.com/hsin501'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block mt-4 bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-500/40 transition-all'
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
          {/* 使用 Grid 佈局來創建清晰的欄位 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
            {/* 前端欄位 */}
            <div>
              <h3 className='font-semibold text-cyan-300 mb-2 border-b border-cyan-800 pb-1'>
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
              <h3 className='font-semibold text-cyan-300 mb-2 border-b border-cyan-800 pb-1'>
                後端開發
              </h3>
              <ul className='list-none mt-2 space-y-1 text-gray-300'>
                {backendSkills.map((skill) => (
                  <li key={skill}>- {skill}</li>
                ))}
              </ul>
            </div>

            {/* 跨欄位的第三個分類 */}
            <div className='md:col-span-2'>
              <h3 className='font-semibold text-cyan-300 mb-2 border-b border-cyan-800 pb-1'>
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
