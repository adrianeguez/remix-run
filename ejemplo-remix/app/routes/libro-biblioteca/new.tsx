import KonstaContainer from "~/components/KonstaContainer";
import { motion } from "framer-motion"
export default function Index(){
    const animationConfiguration = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };
    return (
        <>
            <KonstaContainer titulo="Nuevo Libro biblioteca">
                <motion.div
                    variants={animationConfiguration}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 1 }}
                >
                    <h1>New</h1>
                </motion.div>
            </KonstaContainer>
        </>
    )
}