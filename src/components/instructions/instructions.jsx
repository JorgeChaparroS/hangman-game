import "./instructions.css"
export default function Instructions() {
    return <>
    <article className="instructionsContainer">
        <h2>Instrucciones:</h2>
        <ul>
            <li>El objetivo del juego es que adivines la palabra misteriosa</li>
            <li>Cuando veas un recuadro blanco en la mitad de la pantalla, con unos más pequeños abajo, podrás empezar a jugar</li>
            <li>La palabra misteriosa tiene la misma cantidad de letras que recuadros pequeños. Esa es la primera pista</li>
            <li>Comienza pulsando las letras de tu teclado</li>
            <li>Si pulsaste una letra que está en la palabra misteriosa, ésta se mostrará en los espacios correspondientes</li>
            <li>Por el contrario, si la letra que pulsaste no está en la palabra, habrás perdido uno de los 8 intentos que tienes para adivinar la palabra. Con cuidado, no querrás agotarlos todos.</li>
            <li>¡Buena suerte!</li>
        </ul>
    </article>
    </>
}