import Button from "./ui/Button";

const CallToSignUp = () => {
  return (
    <div className="p-2 hidden md:flex">
      <div className="flex w-full items-center justify-between p-4 bg-gradient-to-r from-[#af2896] to-[#509bf5]">
        <div>
          <p className="text-xs">PREVIEW OF SPOTIFY</p>
          <p className="text-sm">
            Sign up to get unlimited songs and podcats with occasional ads. No
            credit card needed.
          </p>
        </div>
        <Button>Sign up free</Button>
      </div>
    </div>
  );
};

export default CallToSignUp;
