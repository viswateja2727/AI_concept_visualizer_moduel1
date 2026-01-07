import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Props {
  isPlaying: boolean;
}

type Step = {
  title: string;
  rule: string;
  input: string;
  output: string;
};

export const RuleBasedAnimation = ({ isPlaying }: Props) => {
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Input",
        rule: "IF temperature < 18°C",
        input: "Temperature = 16°C",
        output: "Turn heating ON",
      },
      {
        title: "Input",
        rule: "IF temperature ≥ 18°C",
        input: "Temperature = 21°C",
        output: "Turn heating OFF",
      },
      {
        title: "Key idea",
        rule: "Same input → same output",
        input: "No learning",
        output: "Just rules",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setActive(0);
      return;
    }

    const t = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 2200);

    return () => clearInterval(t);
  }, [isPlaying, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] py-4">
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="rounded-2xl bg-card border border-border p-5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-xs text-muted-foreground mb-2">Sensor reading</div>
            <div className="text-base font-semibold text-foreground">{steps[active].input}</div>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-card border border-border p-5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="text-xs text-muted-foreground mb-2">Rule</div>
            <div className="text-base font-semibold text-foreground">{steps[active].rule}</div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2 }}
                key={active}
              />
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-card border border-border p-5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs text-muted-foreground mb-2">Decision</div>
            <div className="text-base font-semibold text-foreground">{steps[active].output}</div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 rounded-2xl bg-muted/30 border border-border p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-foreground">
            Rule-based systems are deterministic: they apply predefined rules to inputs.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            They don’t learn from data—changing behavior requires changing the rules.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
