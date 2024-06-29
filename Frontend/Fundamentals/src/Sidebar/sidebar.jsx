import React from 'react'
import "./sidebar.css"
import { sidebarData } from './sidebarData';

function Sidebar() {
  return (
    // <div className='sidenav'>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 1</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Sets</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 2</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Relations & Functions</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 3</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Tringnomentric Functions</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 4</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Complex Numbers and Quacratic Equations</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 5</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Linear Inequalities</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 6</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Permutations & Combinations</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 7</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Binomial Theorem</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 8</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Sequence & Series</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 9</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Straight Lines</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 10</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Conic Sections</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 11</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Introduction to Three Dimentional Geometry</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 12</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Limits & Derivatives</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 13</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Statistics</span>
    //     </div>
    //     <div className='side-link'>
    //       <span className='unit1'>Unit 14</span>
    //       <div aria-hidden="true" className='unit-1'></div>
    //       <span className='sets'>Probablity</span>
    //     </div>
    // </div>
    <div className='sidebar'>
      <ul className="sidebar-List">
      {sidebarData.map((val, key) => {
        return(
          <li key = {key} className="row" onClick={() => {
            window.location.pathname = val.link;
          }}>
          <div>{val.title1}: {val.title2}</div>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default Sidebar;
