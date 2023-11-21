import { usePoolPhrasesContext } from "./use-poolphrases-context";
import Image from "next/image";

export default function Pool() {
    const { poolPhrases, setWorkingPhrases } = usePoolPhrasesContext();
    return (
        <>
            <div>
                {poolPhrases.map((phrase) => (
                    < div
                        key={phrase[0].note}
                        className="bg-gray-300 rounded-full m-2 px-4 py-1 w-10px h-10px"
                    >
                        {phrase.map(noteandtime => noteandtime.note).toString()}
                        <span className="p-2"
                        // onClick={setWorkingPhrases(prev => [...prev, phrase])}>
                        >
                            <Image
                                alt="work"
                                key={phrase[0].note}
                                src="/../public/hammer.png"
                                className="rounded-full m-2"
                                width={20}
                                height={20}
                            />
                        </span>
                        <Image
                            alt="delete"
                            key={phrase[0].note}
                            src="/../public/trash.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                        <Image
                            alt="save"
                            key={phrase[0].note}
                            src="/../public/save.png"
                            className="rounded-full m-2"
                            width={20}
                            height={20}
                        />
                    </div>
                )
                )}
            </div>
        </>
    );
}

