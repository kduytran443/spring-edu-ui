function NoClassFound({ message = 'Chưa có lớp học nào' }) {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-8 mb-16">
            <img
                alt="no item found"
                src="https://cdn.dribbble.com/users/2394319/screenshots/4773525/media/3abebd7f14032c54245cb54cf48d17a3.png?compress=1&resize=400x300"
            />
            <h3 className="text-3xl font-bold">{message}</h3>
        </div>
    );
}

export default NoClassFound;
