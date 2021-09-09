import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Pagination from "./Pagination";
import Modal from "./Modal";

const Work = (props) => {
    let image;
    let currentItems = [];
    const [project, setProject] = useState([]);
    const [modal, setModal] = useState(false);

    // GraphQL Query
    const data = useStaticQuery(query);
    let work = data.projects.nodes;
    work = work.filter(item => item.category === props.category);

    // Pagination
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    currentItems = work.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
    });

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleShow = (project) => {
        setProject(project);
        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
        setProject([]);
    }

    const handleClickOutside = (event) => {
        if (event.target.id === "modal") {
            setModal(false);
            setProject([]);
        }
    }

    if (work.length > 0) {
        return (
            <Wrapper>
                <div className="container">
                    <div className="projects">
                        {currentItems.map(item => {
                            image = getImage(item.image.localFile);

                            return (
                                <div role="button" tabIndex="0" key={item.id} className={item.featured === true ? "item featured" : "item"} onClick={() => handleShow(item)} onKeyDown={() => handleShow(item)}>
                                    <div className="item-container">
                                        <div className="overlay"></div>
                                        <GatsbyImage image={image} alt={item.alt} />
                                    </div>
                                    {item.featured === true ? <h3>{item.title} | <span>featured project</span></h3> : <h3>{item.title}</h3>}
                                </div>
                            );
                        })}
                    </div>
                    <Pagination itemsPerPage={itemsPerPage} totalItems={work.length} currentPage={currentPage} paginate={paginate} />
                </div>
                <Modal category={props.category} type={null} data={project} modal={modal} handleClose={handleClose} />
            </Wrapper>
        );
    }

    return null;
}

const query = graphql`
  {
    projects:allStrapiProjects(sort: {order: DESC, fields: updated_at}) {
      nodes {
        title
        category
        featured
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        description
        url
        buttonText
        buttonURL
        id
        alt
      }
    }
  }
`

const Wrapper = styled.section`
    position: relative;
    margin: 8em 0 4em 0;

    .container {
        margin-top: -70px;
    }

    .projects {
        .item {
            position: relative;
            overflow: hidden;
            margin-bottom: 1.6em;

            h3 {
                color: var(--primary);
                font-size: 0.8em;
            }

            span {
                font-size: 0.8em;
            }

            img {
                max-width: 100%;
                height: auto;
                transition: 0.5s all ease-in-out;
                opacity: 1;
                max-height: 300px;
            }

            .overlay {
                position: absolute;
                opacity: 0;
                text-align: center;
                transition: .5s ease;
            }

            .item-container:hover img, .item-container:hover {
                opacity: 0.6;
                cursor: pointer;
            }
    
            .item-container:hover .overlay, .item-container:hover {
                opacity: 0.9;
            }
        }
    }

    .container:after {
        content: 'latest work';
        position: absolute;
        top: -125px;
        left: -30px;
        font-size: 8em;
        font-weight: 600;
        color: var(--primary-watermark);
        z-index: -1000;
        width: 1500px;
    }

    .pagination {
        text-align: center;
        margin: 1em 0 1.6em 0;
    }

    .pagination button {
        background: transparent;
        border: 0;
        color: var(--text-dark);
        font-size: 1.3em;
        padding: 0em 0.5em 2em 0.5em;
    }

    .pagination button.active, .pagination button:hover {
        color: var(--primary);
    }

    .pagination button.active {
        cursor: initial;
    }

    @media only screen and (min-width: 768px) {
        .projects {
            display: flex;
            align-items: stretch;
        }

        .projects .item {
            margin: 0.5em;
            width: 300px;
            align-self: flex-end;
        }

        .projects .featured {
            flex-basis: 500px;
        }
    }

    @media only screen and (min-width: 1600px) {
        margin: 6em 0 4em 0;
    }
`

export default Work;