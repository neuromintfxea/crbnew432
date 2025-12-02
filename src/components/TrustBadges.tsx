const banks = [
  "KCB Bank", "Equity Bank", "Family Bank", "Co-op Bank", 
  "Standard Chartered", "NCBA", "Absa Kenya", "I&M Bank",
  "Ecobank", "National Bank", "Stanbic", "DTB"
];

export const TrustBadges = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground font-medium mb-8">
          Trusted by thousands of Kenyans and Lending Institutions.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {banks.map((bank) => (
            <div
              key={bank}
              className="px-4 py-2 bg-secondary/50 rounded-lg border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {bank}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
