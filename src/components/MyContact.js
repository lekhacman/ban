import './MyContact.scss';
import React from 'react';
import MyCard from './MyCard';

export default function MyContact() {
  return (
    <MyCard title="Contact" id="contact">
      <div className="contact">
        <label>Phone</label>
        <span>
          <a href="tel:+6587686989">+65 8768 6989</a>
        </span>

        <label>Email</label>
        <span>
          <a href="mailto:lekhacman@outlook.com">lekhacman@outlook.com</a>
        </span>
      </div>
      <div></div>
    </MyCard>
  );
}
