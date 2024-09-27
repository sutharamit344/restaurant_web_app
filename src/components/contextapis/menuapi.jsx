import React, { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [trending, setTrending] = useState([]);

    const origin = window.location.origin;
    
    useEffect(() => {
        fetch(`${origin}/api/restaurant-menu.json`)
            .then(response => response.json())
            .then(data => {
                setMenu(data);
            })
            .catch(error => console.error("Error fetching the menu: ", error));
    }, [origin]);


    useEffect(() => {
        if(menu.length){
            let item = []
            while(item.length < 4){
                const rndc = Math.floor(Math.random() * menu.length)
                const rndi = Math.floor(Math.random() * menu[rndc].items.length)
                let food = menu[rndc].items[rndi];
                if(!item.some(existing => existing.id === food.id)){
                    item.push(food);
                }
            }
            setTrending(item);
        }
    },[menu])


    return (
        <MenuContext.Provider value={{ menu, trending}}>
            {children}
        </MenuContext.Provider>
    );
};
