import { Link } from "react-router";
import { useEffect, useState } from "react";
import ScoreCircle from "~/components/scoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, jobTitle, companyName, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        let url = '';
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            url = URL.createObjectURL(blob);
            setResumeUrl(url);
        };
        loadResume();

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle &&<h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>


            { resumeUrl && (<div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    {resumeUrl && (
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-2xl"
                        />
                    )}
                </div>
            </div>)}
        </Link>
    );
};

export default ResumeCard;
