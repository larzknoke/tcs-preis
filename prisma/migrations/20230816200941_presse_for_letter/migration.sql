-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "presseEinladung" TIMESTAMP(3),
ADD COLUMN     "presseErlaubt" BOOLEAN,
ADD COLUMN     "presseErledigt" TIMESTAMP(3),
ADD COLUMN     "presseFreigabe" TIMESTAMP(3),
ADD COLUMN     "presseMitteilung" TIMESTAMP(3),
ADD COLUMN     "presseVersendet" TIMESTAMP(3),
ADD COLUMN     "zwb1000" TIMESTAMP(3),
ADD COLUMN     "zwb5000" TIMESTAMP(3);
