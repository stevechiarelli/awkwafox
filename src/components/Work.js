import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Pagination from "./Pagination";
import Modal from "./Modal";
import dots from "../assets/images/dots.svg";

const Work = (props) => {
    let image, featured, work;
    let currentItems = [];
    const [project, setProject] = useState([]);
    const [modal, setModal] = useState(false);

    // GraphQL Query
    const data = useStaticQuery(query);
    let projects = data.projects.nodes;
    work = projects.filter(item => item.category === props.category);
    featured = projects.filter(item => item.featured === true);

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

    if (work.length > 0 || featured.length > 0) {
        if (props.category === "featured") {
            image = getImage(featured[0].image.localFile);
            return (
                <Wrapper>
                    <div className="home">
                        <div className="container grid-container" id="featured">
                            <div role="button" tabIndex="0" className="thumbnail" onClick={() => handleShow(featured[0])} onKeyDown={() => handleShow(featured[0])} >
                                <GatsbyImage image={image} alt={featured[0].alt} />
                            </div>
                            <div>
                                <h3>{featured[0].alt}</h3>
                                <h2>{featured[0].title}</h2>
                                <p>{featured[0].description}</p>
                            </div>
                        </div>
                        <Modal category={props.category} type={null} data={project} modal={modal} handleClose={handleClose} />
                    </div>
                </Wrapper>
            );
        }
        else {
            return (
                <Wrapper>
                    <div className="work">
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
                    </div>
                </Wrapper>
            );
        }
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
        id
        alt
      }
    }
  }
`

const Wrapper = styled.section`
    .work {
        position: relative;
        margin: 8em 0 3em 0;

        .container {
            margin-top: -40px;
        }

        .projects {
            .item {
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
                    opacity: 0.7;
                    cursor: pointer;
                }
        
                .item-container:hover .overlay, .item-container:hover {
                    opacity: 0.7;
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

        .container:before {
            content: '';
            background: url(${dots});
            background-repeat: no-repeat;
            position: absolute;
            right: -60px;
            top: 50px;
            width: 110px;
            height: 800px;
            z-index: -1000;
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
    }

    .home {
        height: 475px;
        background: #fff;
        padding: 3em 0;
        z-index: -1000;

        .grid-container {
            position: relative;
            display: block;
            margin: 0 auto;
            padding: 0;
            text-align: center;

            .thumbnail {
                max-width: 560px;
                z-index: 1;
            }

            h2, h3 {
            color: var(--primary);
            }

            .thumbnail:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }

        .grid-container:after {
            content: 'featured';
            position: absolute;
            top: -120px;
            left: -200px;
            font-size: 8em;
            font-weight: 600;
            color: var(--primary-watermark);
            z-index: 0;
            width: 1000px;
            opacity: 0.4;
        }
    }

    @media only screen and (min-width: 768px) {
        .work {
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

        .home {
            height: 375px;
            padding: 4em 0;

            .grid-container {
                padding: 0 1.5em;
                margin: 0 auto;
                display: flex;
                align-items: flex-end;

                h2, h3, p {
                    text-align: left;
                }

                h2 {
                    font-size: 1.1em
                }

                h3 {
                    font-size: 0.9em;
                }

                p {
                    font-size: 0.9em;
                }
            }

            .grid-container:after {
                top: -100px;
                left: 100px;
            }

            .grid-container > div {
                margin: 0 1em;
            }
        }
    }

    @media only screen and (min-width: 1200px) {
        .home {
            height: 550px;
            padding: 6em 4em;

            .grid-container {
                padding: 0 3em;
            }

            h2 {
                font-size: 2em
            }

            h3 {
                font-size: 1em;
            }

            p {
                font-size: 1em;
            }
        }
    }

    @media only screen and (min-width: 1600px) {
        .work {
            margin: 6em 0 4em 0;
        }
    }

    @media (min-height: 1366px) {
        .home {
            height: 500px;
        }
    }
`

export default Work;