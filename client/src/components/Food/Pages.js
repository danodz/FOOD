import { Link, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Pages = ({nbPages, current})=>{
    const pages = [...Array(nbPages).keys()];
    const [query, setQuery] = useSearchParams()
    const location = useLocation()
    const pageIndex = location.pathname.lastIndexOf("/")
    const baseLocation = location.pathname.substring(0,pageIndex);
    return (
        <>
            {pages.map((page)=>{
                page=page+1;
                return <PageLink key={page} onClick={()=>{
                    query.set("page", page)
                    setQuery(query)
                }}>{page}</PageLink>
            })}
        </>
    )
}
export default Pages;

const PageLink = styled.button`
    margin-left: 10px;
`