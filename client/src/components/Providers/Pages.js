import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Pages = ({nbPages, current})=>{
    const pages = [...Array(nbPages).keys()];
    const location = useLocation()
    const pageIndex = location.pathname.lastIndexOf("/")
    const baseLocation = location.pathname.substring(0,pageIndex);
    return (
        <>
            {pages.map((page)=>{
                page=page+1;
                return <PageLink key={page} to={baseLocation+"/"+page+location.search}>{page}</PageLink>
            })}
        </>
    )
}
export default Pages;

const PageLink = styled(Link)`
    margin-left: 10px;
`