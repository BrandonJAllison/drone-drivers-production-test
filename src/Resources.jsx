import React from 'react';
import './Resources.css'

const ResourcesPage = () => {
  
  return (
    <div className="resources-page">
      <div>
      <div className="welcome">
      <h2>Welcome to Our Resources Page</h2>
        <p className="text">We are delighted to provide you with a broad range of resources that have been expertly curated to help you excel in your educational journey. This page features an assortment of guides, informative articles, study materials, and many more valuable resources.</p>
        <p className="text" >Our primary aim is to ensure you have the most relevant and up-to-date information at your fingertips. While preparing for your test, our resources are designed to meet your needs and enrich your learning experience.</p>
        <p className="text" >Explore the various sections, and don't hesitate to utilize these tools to their full potential. Remember, the key to successful learning lies in the richness of resources and the consistent dedication towards absorbing and applying them. We wish you all the best!</p>
        </div>
    <div className="welcome">
    <h2>Test Tips</h2>
    <p className="text" >When taking a knowledge test, please keep the following points in mind:</p>
    <ol>
        <li className="text" >Carefully read the instructions provided with the test.</li>
        <li className="text" >Answer each question in accordance with the latest regulations and guidance publications.</li>
        <li className="text" >Read each question carefully before looking at the answer options. You should clearly understand the problem before trying to solve it.</li>
        <li className="text" >After formulating a response, determine which answer option corresponds with your answer. The answer you choose should completely solve the problem.</li>
        <li className="text" >Remember that only one answer is complete and correct. The other possible answers are either incomplete or erroneous.</li>
        <li className="text" >If a certain question is difficult for you, mark it for review and return to it after you have answered the less difficult questions. This procedure enables you to use the available time to maximum advantage.</li>
        <li className="text" >When solving a calculation problem, be sure to read all the associated notes.</li>
        <li className="text" >For questions involving use of a graph, you may request a printed copy that you can mark in computing your answer. This copy and all other notes and paperwork are given to the testing center upon completion of the test.</li>
    </ol>
</div>
    </div>
    </div>
  );
};

export default ResourcesPage;
