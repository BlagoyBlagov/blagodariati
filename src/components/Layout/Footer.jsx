const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="py-3 my-4">
            <p className="text-center text-body-secondary">
                &copy; {year} Благодаря Ти
            </p>
        </footer>
    );
};

export default Footer;
