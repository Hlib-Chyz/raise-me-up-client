import { IPage, IPageState } from '@/shared/types/page.types';
import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStore } from '../store';

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
    const response = await fetch('http://localhost:3000/pages');
    if (!response.ok) {
        throw new Error('Failed to fetch pages');
    }
    return response.json();
});

export const addPage = createAsyncThunk('pages/addPage', async (pageData) => {
    const response = await fetch('http://localhost:3000/pages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
    });
    return response.json();
});

export const deletePage = createAsyncThunk('pages/deletePage', async (pageId) => {
    await fetch(`http://localhost:3000/pages/${pageId}`, {
        method: 'DELETE',
    });
    return pageId;
});

export const updatePage = createAsyncThunk(
    'pages/updatePage',
    async ({ pageId, pageData }: { pageId: string; pageData: IPage }) => {
        const response = await fetch(`http://localhost:3000/pages/${pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });
        return response.json();
    },
);

const initialState: IPageState = {
    pages: [],
    currentPage: null,
};

const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        nextPage: (state: Draft<IPageState>) => {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.currentPage?._id === state.pages[i]._id) {
                    state.currentPage = state.pages[i + 1];
                    break;
                }
            }
        },
        previousPage: (state: Draft<IPageState>) => {
            for (let i = 0; i < state.pages.length; i++) {
                if (state.currentPage?._id === state.pages[i]._id) {
                    state.currentPage = state.pages[i - 1];
                    break;
                }
            }
        },
        setCurrentPage: (state: Draft<IPageState>, action: PayloadAction<IPage['_id']>) => {
            state.currentPage = state.pages.find((page) => page._id === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPages.fulfilled, (state, action) => {
            state.pages = action.payload;
            state.currentPage = action.payload[0];
        });
    },
});

export default pageSlice.reducer;

export const { nextPage, previousPage, setCurrentPage } = pageSlice.actions;

export const pagesState = (state: IStore) => state.page.pages;
export const numberOfPagesState = (state: IStore) => state.page.pages.length;
export const currentPageState = (state: IStore) => state.page.currentPage;
export const currentPageIndexState = (state: IStore) =>
    pagesState(state).findIndex((page) => currentPageState(state)?._id === page._id);
// {
//     name: 'English',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Enhanced Proficiency in English Communication',
//         },
//         {
//             type: TextType.TopText,
//             text: 'Over the last six months, I have made significant strides in improving my English language proficiency, a key skill in today’s global business environment. My efforts and achievements in enhancing my command of the language include:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'Reduced Errors in Conversational English:',
//                     regular:
//                         'I have significantly decreased the number of errors in my spoken English, enhancing my ability to communicate effectively and professionally in a workplace setting.',
//                 },
//                 {
//                     bold: 'Improved Comprehension of Native Speakers:',
//                     regular:
//                         'I have developed a better understanding of conversations with native English speakers, which has greatly enhanced my ability to engage in more meaningful discussions and collaborations.',
//                 },
//                 {
//                     bold: 'Completion of First Book in English:',
//                     regular:
//                         'I successfully read my first book entirely in English, which not only improved my vocabulary and comprehension skills but also boosted my confidence in handling complex texts.',
//                 },
//                 {
//                     bold: 'Overall Language Skill Improvement:',
//                     regular:
//                         'Through consistent practice and exposure, I have improved all aspects of my English, including reading, writing, listening, and speaking, which has facilitated smoother interactions in my professional and personal life.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'These advancements in English have not only improved my communication skills but also opened up more opportunities for collaboration and leadership within our multicultural team.',
//         },
//     ],
//     id: 0,
// },
// {
//     name: 'Next.js, Redux',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Advanced Web Development with Next.js and Redux',
//         },
//         {
//             type: TextType.TopText,
//             text: 'Over the past six months, I have leveraged the powerful capabilities of Next.js and Redux to build a sophisticated web application. This project highlights my comprehensive understanding and effective use of these technologies:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'SEO Optimization:',
//                     regular:
//                         'I implemented various SEO features of Next.js, such as server-side rendering (SSR), dynamic meta tags, and optimized routing, to enhance the visibility and searchability of the application.',
//                 },
//                 {
//                     bold: 'Server-Side Rendering (SSR)::',
//                     regular:
//                         'By utilizing SSR capabilities in Next.js, I ensured that the application loads quickly and efficiently, improving user experience and SEO performance by serving pre-rendered pages to the browser.',
//                 },
//                 {
//                     bold: 'Data Fetching:',
//                     regular:
//                         'I structured the application to fetch data effectively using Next.js frameworks, ensuring that data handling is optimized for performance and scalability.',
//                 },
//                 {
//                     bold: 'Comprehensive Use of Redux:',
//                     regular:
//                         'I skillfully utilized the full functionality of Redux, including selectors for efficient state management, actions to define the payloads of information sent between the application and the store, reducers to specify how the application`s state changes in response, and effects for handling side effects in the application logic.',
//                 },
//                 {
//                     bold: 'Integration of Technologies:',
//                     regular:
//                         'The seamless integration of Next.js and Redux in the application demonstrates my ability to architect and develop advanced web applications that are both robust and maintainable.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'This project not only showcased my technical proficiency in using Next.js and Redux but also enhanced my ability to develop highly interactive and user-friendly web applications.',
//         },
//     ],
//     id: 1,
// },
// {
//     name: 'Tailwind CSS',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Mastery of Tailwind CSS for Responsive and Customizable Web Design',
//         },
//         {
//             type: TextType.TopText,
//             text: 'In the last six months, I have successfully developed a project using Tailwind CSS, enhancing my understanding and application of this utility-first CSS framework. My experience included:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'Grasping the Fundamentals:',
//                     regular:
//                         'I delved deep into Tailwind CSS, understanding its core principles and how it differs from traditional CSS frameworks by offering a more efficient, utility-first approach.',
//                 },
//                 {
//                     bold: 'Customization of Styles:',
//                     regular:
//                         'I customized numerous components to fit the specific aesthetic and functional needs of the project, demonstrating my ability to tailor design elements seamlessly.',
//                 },
//                 {
//                     bold: 'Responsive Layouts:',
//                     regular:
//                         'I implemented responsive design practices to ensure that our web application adapts smoothly across different devices and screen sizes, providing an optimal user experience.',
//                 },
//                 {
//                     bold: 'Reusable Styles:',
//                     regular:
//                         'By creating reusable style utilities, I streamlined the development process, reduced redundancy, and maintained consistency throughout the application, which significantly boosted our project’s scalability and maintainability.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'This comprehensive engagement with Tailwind CSS not only enhanced the visual and functional aspects of our project but also solidified my skills in modern web design techniques, making me a more versatile and effective developer.',
//         },
//     ],
//     id: 2,
// },
// {
//     name: 'NestJS',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Proficiency in NestJS: Building Advanced Web Applications',
//         },
//         {
//             type: TextType.TopText,
//             text: 'In the past six months, I have deepened my expertise in NestJS, a progressive Node.js framework, by developing two mini-applications that utilize its full range of capabilities. Key features of these projects included:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'CRUD Operations:',
//                     regular:
//                         'I implemented Create, Read, Update, and Delete functionalities, which are fundamental for dynamic web applications, ensuring robust data management.',
//                 },
//                 {
//                     bold: 'Email Integration:',
//                     regular:
//                         'I integrated email sending functionalities within the applications, enabling communication with users through automated emails.',
//                 },
//                 {
//                     bold: 'WebSockets Implementation:',
//                     regular:
//                         'By incorporating WebSockets, I enabled real-time, bidirectional communication between the clients and the server, which is crucial for instant data updates and interactive user interfaces.',
//                 },
//                 {
//                     bold: 'Leveraging NestJS Features:',
//                     regular:
//                         'I utilized various core features of NestJS, including dependency injection, modularization, and asynchronous handling, to build scalable and maintainable applications.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'These projects not only demonstrated my ability to harness the full potential of NestJS but also strengthened my backend development skills, allowing me to contribute more effectively to our web development projects.',
//         },
//     ],
//     id: 3,
// },
// {
//     name: 'MongoDB',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Advanced Database Management with MongoDB and TypeORM',
//         },
//         {
//             type: TextType.TopText,
//             text: 'In the last six months, I have effectively utilized MongoDB, a powerful NoSQL database, along with TypeORM, an ORM tool that bridges the gap between relational databases and object-oriented programming. My project demonstrates a high level of expertise and innovation in database management:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'Complex Queries:',
//                     regular:
//                         'I crafted complex queries in MongoDB to handle diverse data retrieval needs, optimizing performance and ensuring quick access to large datasets.',
//                 },
//                 {
//                     bold: 'Integration with TypeORM:',
//                     regular:
//                         'Utilizing TypeORM, I managed MongoDB more effectively by taking advantage of its features like transactions, connections, and repositories which simplify data manipulation and retrieval operations.',
//                 },
//                 {
//                     bold: 'Database Design:',
//                     regular:
//                         'I designed and structured the database schema efficiently, ensuring scalability and robustness while enabling easy modifications and enhancements.',
//                 },
//                 {
//                     bold: 'Performance Optimization:',
//                     regular:
//                         'Through the strategic use of indexing and query optimization in MongoDB, I significantly improved the application’s response times and overall performance.',
//                 },
//                 {
//                     bold: 'Seamless Integration:',
//                     regular:
//                         'The integration of MongoDB with TypeORM showcased my ability to combine different technologies to enhance backend functionalities and improve the application architecture.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'This project not only advanced my technical skills in database management but also highlighted my ability to innovate and implement effective solutions in complex development environments.',
//         },
//     ],
//     id: 4,
// },
// {
//     name: 'Testing',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Comprehensive Testing Mastery Across Multiple Technologies',
//         },
//         {
//             type: TextType.TopText,
//             text: 'Over the past six months, I have significantly advanced my testing skills by completing the "Conscious Angular Testing" course and applying the learned concepts across various technologies in a real-world project. My journey in enhancing my testing capabilities includes:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'Course Completion:',
//                     regular:
//                         'I completed the "Conscious Angular Testing" course, which equipped me with a robust foundation in writing effective unit tests and mastering Angular-specific testing frameworks.',
//                 },
//                 {
//                     bold: 'Cross-Technology Application:',
//                     regular:
//                         'Despite the course`s focus on Angular, I adeptly applied the testing principles to other technologies, including NestJS, Next.js, and Redux, showcasing my versatility and adaptability in software development.',
//                 },
//                 {
//                     bold: 'Unit Testing:',
//                     regular:
//                         'I implemented unit tests to ensure that individual components function correctly in isolation across different technologies.',
//                 },
//                 {
//                     bold: 'Integration Testing:',
//                     regular:
//                         'By integrating multiple components, I tested their interactions within applications built with NestJS and Next.js, verifying cohesive functionality.',
//                 },
//                 {
//                     bold: 'End-to-End (E2E) Testing:',
//                     regular:
//                         'I conducted E2E tests to simulate user interactions from start to finish across different environments, ensuring comprehensive performance in real-world scenarios.',
//                 },
//                 {
//                     bold: 'Full Test Coverage for Pet Project:',
//                     regular:
//                         'My pet project was fully covered with tests (unit, integration, and E2E), demonstrating my ability to enforce high-quality standards and reliability in diverse development stacks.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'This focused effort on mastering testing across multiple frameworks not only improved the stability and quality of the applications I work on but also highlighted my commitment to delivering error-free and user-optimized software.',
//         },
//     ],
//     id: 5,
// },
// {
//     name: 'Advancing Algorithmic Problem-Solving',
//     info: [
//         {
//             type: TextType.Heading,
//             text: 'Enhancing Problem-Solving Skills Through Complex Algorithmic Challenges',
//         },
//         {
//             type: TextType.TopText,
//             text: 'Over the past six months, I have actively focused on enhancing my competency in algorithmic thinking and logical problem-solving by tackling challenging tasks similar to those used in interviews by leading tech companies, including Google. This endeavor has not only allowed me to refine my programming skills and algorithmic thought process but also:',
//         },
//         {
//             type: TextType.List,
//             list: [
//                 {
//                     bold: 'Improved my ability to quickly adapt',
//                     regular:
//                         'to new and unforeseen challenges, enhancing my overall productivity as a developer.',
//                 },
//                 {
//                     bold: 'Expanded my understanding of complex algorithms',
//                     regular:
//                         'and data structures, directly impacting the quality and efficiency of my code.',
//                 },
//                 {
//                     bold: 'Strengthened logical thinking and attention to detail,',
//                     regular:
//                         'which is critically important for problem-solving in development and debugging tasks.',
//                 },
//             ],
//         },
//         {
//             type: TextType.BottomText,
//             text: 'This experience has contributed to my personal growth as a professional and increased the value I bring to the team and projects within our company, demonstrating an improved capability to quickly resolve complex issues and optimize existing processes.',
//         },
//     ],
//     id: 6,
// },
