import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Pages = ({nbPages, current})=>{
    const pages = [...Array(nbPages).keys()];
    const [query, setQuery] = useSearchParams()
    return (
        <>
            {pages.length>1&&
            <>
                Pages:
                {pages.map((page)=>{
                    page=page+1;
                    return <PageLink key={page} onClick={()=>{
                        query.set("page", page)
                        setQuery(query)
                    }}>{page}</PageLink>
                })}
            </>}
        </>
    )
}
export default Pages;

const PageLink = styled.button`
    margin-left: 10px;
`