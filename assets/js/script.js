var config = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 786
            }
        },
        color: {
            value: ["#ffffff", "#ffffffff", "#F9F871", "#dfa02dff"]
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 12
            },
            image: {
                src: "",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 1,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false
            }
        },
        size: {
            value: 2.5,
            random: true,
            anim: {
                enable: true,
                speed: 3,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: false,
            distance: 100,
            color: "#fff",
            opacity: 0.023674428,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.3,
            direction: "top",
            random: true,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 2082.2488,
                rotateY: 3363.6328
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 70,
                line_linked: {
                    opacity: 0.25
                }
            },
            bubble: {
                distance: 100,
                size: 5,
                duration: 8.598243,
                opacity: 0,
                speed: 3
            },
            repulse: {
                distance: 150,
                duration: 0.8
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

window.onload = function() {
    let clause = window.innerWidth < 768;
    config.particles.number.value = clause ? 80 : 150;
    particlesJS('particle', config);
};