import React from "react";
import { motion } from "framer-motion";
import "./Menu.css";

const moveIn = {
  hidden: {
    x: "-50vw",
    opacity: "0",
  },
  visible: {
    x: "0",
    opacity: "1",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: "0vw",
    opacity: "0",
  },
};

function Menu() {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={moveIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="menu"
    >
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="/setting">Setting</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
      <div id="ref">
        <h4>Created by</h4>
        <p>Tapaneeya Odmung</p>
      </div>
    </motion.div>
  );
}

export default Menu;
