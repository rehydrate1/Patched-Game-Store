import {StarIcon} from "@heroicons/react/24/solid";

export default function StarRating ({rating}: { rating: number }) {

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <StarIcon
                    key={index}
                    className={`h-5 w-5 ${index < rating ? 'text-green-400' : 'text-gray-600'}`}
                />
            ))}
        </div>
    );
};
