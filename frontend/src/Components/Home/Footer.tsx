import React, { Component } from "react";
import githubicon from "../../assets/github-icon.svg";

export default class Footer extends Component {
    render(){
        return (
            <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black dark:border-gray-600">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">IFPE Campus Igarassu - Rod. Gov. Mário Covas, 4031, PE, 53700-000<a href="https://flowbite.com/" className="hover:underline"></a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://github.com/gustavojms/screenshare" target="_blank"><img className="w-8 h-8" src={githubicon}/></a>
                    </li>
                </ul>
            </footer>
        )
    }
}