import React from 'react';
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import "./localizacao.css"

export default function Localizacao() {

    return (
        <>
            <Menu />
            <article className="localizacao-article">

                <div className="localizacao-article-divum">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.549803012391!2d-46.58667978543261!3d-23.5846071846714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c0decabc7ed%3A0x6ad7690efb4256a4!2sAv.%20Professor%20Luiz%20Ign%C3%A1cio%20Anhaia%20Mello%2C%20900%20-%20Q.ta%20da%20Paineira%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003134-001!5e0!3m2!1spt-PT!2sbr!4v1614881609707!5m2!1spt-PT!2sbr" style={{ width: "100%", height: "100%" }} allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="localizacao-article-divdois">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1542962228223!2d-46.517919185433165!3d-23.562901284682088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce675f8df15f41%3A0xea04efc43de3139c!2sAv.%20Rio%20das%20Pedras%2C%20800%20-%20Jardim%20Aricanduva%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003454-010!5e0!3m2!1spt-PT!2sbr!4v1614881858957!5m2!1spt-PT!2sbr" style={{ width: "100%", height: "100%" }} allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="localizacao-article-divtres">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8101755568046!2d-46.609722685433596!3d-23.539328884693912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5927512993c1%3A0xac4fd4cf13d56d3c!2sAv.%20Celso%20Garcia%2C%20500%20-%20Br%C3%A1s%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003014-000!5e0!3m2!1spt-PT!2sbr!4v1614881964625!5m2!1spt-PT!2sbr" style={{ width: "100%", height: "100%" }} allowfullscreen="" loading="lazy"></iframe>
                </div>

            </article>
            <Footer />
        </>
    )
}