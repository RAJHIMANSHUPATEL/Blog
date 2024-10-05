import { createContext } from "react";

export const BlogContext = createContext()

const initialState = {
    blogs: null,

}

export const BlogContextProvider = ({children})=> {

    // 

    

    return(
        <BlogContext.Provider value={{}}>
            {children}
        </BlogContext.Provider>
    )
}